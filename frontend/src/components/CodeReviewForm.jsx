import React, { useState } from 'react'
import { Upload, FileText, Loader2, AlertCircle, Code, Zap, Shield, Eye } from 'lucide-react'

const CodeReviewForm = ({ onSubmit, isLoading, error }) => {
  const [filename, setFilename] = useState('')
  const [sourceCode, setSourceCode] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (filename.trim() && sourceCode.trim()) {
      onSubmit(filename.trim(), sourceCode.trim())
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFilename(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        setSourceCode(event.target.result)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="card card-hover">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
          <Code className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Analyze Your Code
        </h2>
        <p className="text-slate-600 text-lg">
          Get professional insights on code quality, security, and architecture
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="filename" className="flex items-center text-sm font-semibold text-slate-700">
            <FileText className="h-4 w-4 mr-2 text-blue-600" />
            Filename
          </label>
          <input
            type="text"
            id="filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="e.g., main.js, app.py, component.tsx"
            className="input-field"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="sourceCode" className="flex items-center text-sm font-semibold text-slate-700">
            <Code className="h-4 w-4 mr-2 text-blue-600" />
            Source Code
          </label>
          <textarea
            id="sourceCode"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Paste your code here or upload a file..."
            className="textarea-field"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="btn-secondary cursor-pointer flex items-center justify-center space-x-2 group">
            <Upload className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Upload File</span>
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.swift,.kt"
              className="hidden"
            />
          </label>
          
          <button
            type="submit"
            disabled={isLoading || !filename.trim() || !sourceCode.trim()}
            className="btn-primary flex items-center justify-center space-x-2 flex-1 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing Code...</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Start Analysis</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Analysis Features */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
            <Eye className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Code Quality</h3>
          <p className="text-sm text-slate-600">Readability, formatting, and style analysis</p>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
            <Code className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Architecture</h3>
          <p className="text-sm text-slate-600">Structure, modularity, and design patterns</p>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-100">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-3">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Security</h3>
          <p className="text-sm text-slate-600">Vulnerabilities and security best practices</p>
        </div>
      </div>
    </div>
  )
}

export default CodeReviewForm
