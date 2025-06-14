const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = parseInt(process.env.PORT, 10) || 3000

// Initialize Next.js
const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler()

// Initialize Express for API
const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      frontend: 'active',
      backend: 'active'
    }
  })
})

// API Routes (connecting to your existing backend)
app.use('/api', async (req, res) => {
  // Proxy API requests to your working backend
  const backendUrl = 'https://api.opsmith.biz'
  
  try {
    const fetch = (await import('node-fetch')).default
    const response = await fetch(`${backendUrl}${req.url}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    })
    
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    console.error('API Proxy Error:', error)
    res.status(500).json({ error: 'Backend API unavailable' })
  }
})

nextApp.prepare().then(() => {
  // Handle all other requests with Next.js
  app.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`🚀 OpSmith Platform ready on http://${hostname}:${port}`)
    console.log(`🔗 Connected to backend API: https://api.opsmith.biz`)
  })
})