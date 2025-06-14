'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Brain, Database, Zap, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState<{
    connected: boolean;
    message?: string;
    timestamp?: string;
  }>({ connected: false });

  // Test backend connection
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch('/api/test');
        const data = await response.json();
        setBackendStatus({
          connected: data.success,
          message: data.message,
          timestamp: data.timestamp
        });
      } catch (error) {
        setBackendStatus({
          connected: false,
          message: 'Backend connection failed'
        });
      }
    };
    
    testBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">OpSmith</span>
              {backendStatus.connected && (
                <div className="flex items-center space-x-1 ml-4">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              )}
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#status" className="text-gray-600 hover:text-gray-900">Status</a>
              <Button>Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Status Banner */}
      {backendStatus.connected && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-green-800">
              <CheckCircle className="h-4 w-4" />
              <span>🎉 Platform Status: All systems operational!</span>
              <span className="text-green-600">• Backend: Connected</span>
              <span className="text-green-600">• Frontend: Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Operations Intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your business operations with intelligent data analysis, automated insights, 
            and real-time decision support powered by advanced AI.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="px-8">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Get instant insights from your operational data with advanced analytics and visualization.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Database className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Data Integration</CardTitle>
                <CardDescription>
                  Connect all your data sources seamlessly for a unified view of your operations.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Automated Workflows</CardTitle>
                <CardDescription>
                  Streamline your processes with intelligent automation and decision support.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section id="status" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            System Status
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-2">
                  {backendStatus.connected ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <span className="text-green-600">All Systems Operational</span>
                    </>
                  ) : (
                    <>
                      <div className="h-6 w-6 rounded-full bg-yellow-500" />
                      <span className="text-yellow-600">Connecting...</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Frontend Service</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Backend API</span>
                    <div className="flex items-center space-x-2">
                      {backendStatus.connected ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Connected</span>
                        </>
                      ) : (
                        <>
                          <div className="h-4 w-4 rounded-full bg-yellow-500" />
                          <span className="text-yellow-600">Connecting</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Live Backend Services</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">api.opsmith.biz</span>
                    </div>
                  </div>
                </div>
                
                {backendStatus.timestamp && (
                  <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                    Last checked: {new Date(backendStatus.timestamp).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using OpSmith to optimize their operations.
          </p>
          <Button size="lg" variant="secondary" className="px-8">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-6 w-6" />
              <span className="text-lg font-bold">OpSmith</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered operations intelligence platform
            </p>
            <div className="text-sm text-gray-500">
              <p>✅ Frontend: Next.js 14 • Backend: Express.js • Deployment: Combined Service</p>
              <p>🔗 Connected to: api.opsmith.biz (Live Backend)</p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
              © 2024 OpSmith. All rights reserved. • Clean Repository Deployment
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}