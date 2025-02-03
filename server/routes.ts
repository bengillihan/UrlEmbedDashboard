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
      if (req.headers.origin) {
        proxyReq.setHeader('Origin', req.headers.origin);
      }
      if (req.headers.referer) {
        proxyReq.setHeader('Referer', req.headers.referer);
      }
    },
    onProxyRes: function(proxyRes, req, res) {
      // Ensure proper CORS headers
      proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Cookie, X-Requested-With, Authorization';
      proxyRes.headers['access-control-expose-headers'] = 'Set-Cookie';
    }
  }));

  // PowerBI proxy with enhanced cookie handling
  app.use('/api/powerbi-proxy', createProxyMiddleware({
    target: 'https://app.powerbi.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/powerbi-proxy': '/'
    },
    cookieDomainRewrite: {
      '*': '' // Rewrite cookie domain to match our domain
    },
    secure: true,
    xfwd: true,
    withCredentials: true,
    onProxyReq: (proxyReq, req) => {
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
      if (req.headers.origin) {
        proxyReq.setHeader('Origin', req.headers.origin);
      }
      if (req.headers.referer) {
        proxyReq.setHeader('Referer', req.headers.referer);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Cookie, X-Requested-With, Authorization';
      proxyRes.headers['access-control-expose-headers'] = 'Set-Cookie';
    }
  }));

  // Salesflow proxy with enhanced cookie handling
  app.use('/api/salesflow-proxy', createProxyMiddleware({
    target: 'https://sales-service-portal-bdgillihan.replit.app',
    changeOrigin: true,
    pathRewrite: {
      '^/api/salesflow-proxy': '/'
    },
    cookieDomainRewrite: {
      '*': '' // Rewrite cookie domain to match our domain
    },
    secure: true,
    xfwd: true,
    withCredentials: true,
    onProxyReq: (proxyReq, req) => {
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
      if (req.headers.origin) {
        proxyReq.setHeader('Origin', req.headers.origin);
      }
      if (req.headers.referer) {
        proxyReq.setHeader('Referer', req.headers.referer);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Cookie, X-Requested-With, Authorization';
      proxyRes.headers['access-control-expose-headers'] = 'Set-Cookie';
    }
  }));

  const httpServer = createServer(app);
  return httpServer;
}