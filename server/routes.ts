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
  // Proxy middleware configuration for Salesflow
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
    onProxyReq: (proxyReq, req) => {
      // Forward cookies
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // Handle CORS and cookie settings
      proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Cookie, X-Requested-With';
    }
  }));

  // PowerBI proxy
  app.use('/api/powerbi-proxy', createProxyMiddleware({
    target: 'https://app.powerbi.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/powerbi-proxy': '/'
    },
    cookieDomainRewrite: {
      '*': ''
    },
    secure: true,
    xfwd: true,
    onProxyReq: (proxyReq, req) => {
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Cookie, X-Requested-With';
    }
  }));

  // QuickBase proxy
  app.use('/api/quickbase-proxy', createProxyMiddleware({
    target: 'https://americanpower.quickbase.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/quickbase-proxy': '/'
    },
    cookieDomainRewrite: {
      '*': ''
    },
    secure: true,
    xfwd: true,
    onProxyReq: (proxyReq, req) => {
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
      proxyRes.headers['access-control-allow-credentials'] = 'true';
      proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
      proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Cookie, X-Requested-With';
    }
  }));

  const httpServer = createServer(app);
  return httpServer;
}