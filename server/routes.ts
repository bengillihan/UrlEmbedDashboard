import type { Express } from "express";
import { createServer, type Server } from "http";
import { createProxyMiddleware } from 'http-proxy-middleware';

export function registerRoutes(app: Express): Server {
  // Configure common CORS headers middleware
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Add SSP proxy with simplified configuration
  app.use('/api/ssp-proxy', createProxyMiddleware({
    target: 'https://aps.work',
    changeOrigin: true,
    pathRewrite: { '^/api/ssp-proxy': '/ssp' },
    cookieDomainRewrite: '*',
    secure: true,
    headers: {
      'X-Forwarded-Host': 'aps.work',
      'X-Forwarded-Proto': 'https'
    },
    onProxyReq: (proxyReq, req: any, res: any) => {
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes: any, req: any, res: any) => {
      const cookies = proxyRes.headers['set-cookie'];
      if (cookies) {
        proxyRes.headers['set-cookie'] = cookies.map((cookie: string) =>
          cookie.replace(/Domain=[^;]+;/, '')
        );
      }
    },
    onError: (err: Error, req: any, res: any) => {
      console.error('[SSP Proxy] Error:', err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Something went wrong with SSP proxy: ' + err.message);
    }
  }));

  // PowerBI proxy with enhanced configuration
  app.use('/api/powerbi-proxy', createProxyMiddleware({
    target: 'https://app.powerbi.com',
    changeOrigin: true,
    pathRewrite: { '^/api/powerbi-proxy': '' },
    ws: true,
    secure: true,
    headers: {
      'X-Forwarded-Host': 'app.powerbi.com',
      'X-Forwarded-Proto': 'https',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    },
    onProxyReq: (proxyReq: any, req: any, res: any) => {
      // Log request for debugging
      console.log('[PowerBI Proxy] Proxying request to:', req.url);

      // Copy original headers
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }

      // Add PowerBI specific headers if they exist
      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
    },
    onProxyRes: (proxyRes: any, req: any, res: any) => {
      // Handle cookies
      const cookies = proxyRes.headers['set-cookie'];
      if (cookies) {
        proxyRes.headers['set-cookie'] = cookies.map((cookie: string) =>
          cookie.replace(/Domain=[^;]+;/, '')
            .replace(/Secure;/gi, '')
            .replace(/SameSite=[^;]+;/gi, 'SameSite=Lax;')
        );
      }

      // Log response status for debugging
      console.log('[PowerBI Proxy] Response status:', proxyRes.statusCode);
    },
    onError: (err: Error, req: any, res: any) => {
      console.error('[PowerBI Proxy] Error:', err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Something went wrong with PowerBI proxy: ' + err.message);
    }
  }));

  const httpServer = createServer(app);
  return httpServer;
}