import React from 'react'
import { Code2, Shield, Sparkles, Zap } from 'lucide-react'

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl">
                <Code2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">CodeReview</span>
            <span className="text-slate-800"> Pro</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional-grade code analysis powered by advanced AI. 
            Get instant feedback on code quality, security, and best practices.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm">
              🔍 Deep Analysis
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm">
              🛡️ Security Focus
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm">
              ⚡ Instant Results
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm">
              📊 Risk Assessment
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
