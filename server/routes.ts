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
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      // Log request details for debugging
      console.log('[SSP Proxy] Request headers:', req.headers);
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // Log response details for debugging
      console.log('[SSP Proxy] Response headers:', proxyRes.headers);
    },
    onError: (err, req, res) => {
      console.error('[SSP Proxy] Error:', err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Something went wrong with SSP proxy: ' + err.message);
    }
  }));

  // PowerBI proxy with simplified configuration
  app.use('/api/powerbi-proxy', createProxyMiddleware({
    target: 'https://app.powerbi.com',
    changeOrigin: true,
    pathRewrite: { '^/api/powerbi-proxy': '/' },
    cookieDomainRewrite: '*',
    secure: true,
    headers: {
      'X-Forwarded-Host': 'app.powerbi.com',
      'X-Forwarded-Proto': 'https'
    },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      console.log('[PowerBI Proxy] Request headers:', req.headers);
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('[PowerBI Proxy] Response headers:', proxyRes.headers);
    },
    onError: (err, req, res) => {
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