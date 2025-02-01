import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  // Add CORS proxy route for SSP
  app.use('/api/ssp-proxy', (req, res) => {
    // Forward requests to SSP with proper headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('X-Frame-Options', 'ALLOW-FROM https://aps.work/');
    res.header('Access-Control-Allow-Credentials', 'true');

    // Forward the request
    res.redirect('https://aps.work/ssp' + req.url);
  });

  const httpServer = createServer(app);
  return httpServer;
}