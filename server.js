const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

// Initialize Next.js
app.prepare().then(() => {
  const server = express();

  // Enable CORS
  server.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Parse JSON
  server.use(express.json());

  // Logging middleware
  server.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Backend API Routes
  // Health check endpoint
  server.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      message: 'OpSmith Platform - Combined Frontend + Backend',
      version: '1.0.0',
      services: {
        frontend: 'Next.js 14',
        backend: 'Express.js',
        deployment: 'Combined Single Service'
      }
    });
  });

  // Simple API endpoint for testing
  server.get('/api/test', (req, res) => {
    res.json({
      success: true,
      message: 'Backend API is working!',
      timestamp: new Date().toISOString(),
      backend_connected: true
    });
  });

  // Connect to live backend API proxy
  server.get('/api/backend/*', async (req, res) => {
    try {
      const backendUrl = `https://api.opsmith.biz${req.path.replace('/api/backend', '/api')}`;
      
      const response = await fetch(backendUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          ...req.headers
        }
      });
      
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({
        error: 'Backend connection failed',
        message: error.message
      });
    }
  });

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start server
  server.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 OpSmith Platform Starting - Combined Frontend + Backend');
    console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
    console.log(`🎨 Frontend: Next.js serving on all routes`);
    console.log(`🔗 Backend API: Available on /api/* routes`);
    console.log(`🏥 Health Check: GET /api/health`);
    console.log(`🧪 Test API: GET /api/test`);
    console.log(`🔄 Backend Proxy: /api/backend/* → https://api.opsmith.biz/api/*`);
    console.log(`📱 Live URL: Will be available on DigitalOcean deployment`);
  });

}).catch((ex) => {
  console.error('Failed to start server:', ex);
  process.exit(1);
});