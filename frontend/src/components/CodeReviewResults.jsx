import React from 'react'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, CheckCircle, AlertTriangle, AlertCircle, Shield, FileText, Lightbulb, TrendingUp, Clock } from 'lucide-react'

const CodeReviewResults = ({ result, onReset }) => {
  const getRiskScoreClass = (score) => {
    if (score <= 3) return 'risk-low'
    if (score <= 6) return 'risk-medium'
    return 'risk-high'
  }

  const getRiskScoreIcon = (score) => {
    if (score <= 3) return <CheckCircle className="h-6 w-6" />
    if (score <= 6) return <AlertTriangle className="h-6 w-6" />
    return <AlertCircle className="h-6 w-6" />
  }

  const getRiskScoreText = (score) => {
    if (score <= 3) return 'Low Risk'
    if (score <= 6) return 'Medium Risk'
    return 'High Risk'
  }

  const getRiskScoreDescription = (score) => {
    if (score <= 3) return 'Your code looks great! Minor improvements suggested.'
    if (score <= 6) return 'Some areas need attention. Review the suggestions below.'
    return 'Several issues detected. Please review the recommendations carefully.'
  }

  return (
    <div className="space-y-8">
      {/* Header with Reset Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Analysis Complete</h2>
          <p className="text-slate-600">Here's your comprehensive code review report</p>
        </div>
        <button
          onClick={onReset}
          className="btn-ghost flex items-center space-x-2 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Analyze Another File</span>
        </button>
      </div>

      {/* Risk Score Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span>Risk Assessment</span>
          </h3>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className={`px-6 py-4 rounded-2xl flex items-center space-x-3 ${getRiskScoreClass(result.risk_score)}`}>
            {getRiskScoreIcon(result.risk_score)}
            <div>
              <div className="font-bold text-lg">
                {result.risk_score}/10 - {getRiskScoreText(result.risk_score)}
              </div>
              <div className="text-sm opacity-80">
                {getRiskScoreDescription(result.risk_score)}
              </div>
            </div>
          </div>
          
          {/* Risk Meter */}
          <div className="flex-1">
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  result.risk_score <= 3 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  result.risk_score <= 6 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                  'bg-gradient-to-r from-red-400 to-rose-500'
                }`}
                style={{ width: `${(result.risk_score / 10) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span>Analysis Summary</span>
        </h3>
        <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800">
          <ReactMarkdown>{result.summary}</ReactMarkdown>
        </div>
      </div>

      {/* Suggestions Card */}
      <div className="card">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <span>Improvement Recommendations</span>
        </h3>
        <div className="space-y-4">
          {Array.isArray(result.suggestions) ? (
            result.suggestions.map((suggestion, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div className="flex-1 prose prose-slate max-w-none prose-p:text-slate-700 prose-strong:text-slate-800">
                    <ReactMarkdown>{suggestion}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <p className="text-yellow-800 font-medium">
                  No specific suggestions provided in the response.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">
            {Array.isArray(result.suggestions) ? result.suggestions.length : 0}
          </div>
          <div className="text-sm text-slate-600">Suggestions</div>
        </div>
        
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">
            {10 - result.risk_score}
          </div>
          <div className="text-sm text-slate-600">Quality Score</div>
        </div>
        
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800 mb-1">
            Instant
          </div>
          <div className="text-sm text-slate-600">Analysis Time</div>
        </div>
      </div>

      {/* Raw Response (for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="card">
          <h4 className="font-semibold text-slate-700 mb-4">Raw Response (Debug)</h4>
          <pre className="text-xs text-slate-600 overflow-auto bg-slate-50 p-4 rounded-lg">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default CodeReviewResults
