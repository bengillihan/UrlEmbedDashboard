import type { Express } from "express";
import { createServer, type Server } from "http";
import { createProxyMiddleware } from 'http-proxy-middleware';

export function registerRoutes(app: Express): Server {
  // Add SSP proxy with proper cookie handling
  app.use('/api/ssp-proxy', createProxyMiddleware({
    target: 'https://aps.work',
    changeOrigin: true,
    pathRewrite: {
      '^/api/ssp-proxy': '/ssp'  // rewrite path
    },
    cookieDomainRewrite: {
      '*': '' // rewrite cookie domain to match our domain
    },
    secure: true,
    xfwd: true,
    withCredentials: true,
    onProxyReq: (proxyReq, req) => {
      // Forward original headers
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: function(proxyRes, req, res) {
      // Ensure proper CORS headers
      proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Cookie, X-Requested-With';
    }
  }));

  const httpServer = createServer(app);
  return httpServer;
}