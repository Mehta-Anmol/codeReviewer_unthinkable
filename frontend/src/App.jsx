import React, { useState } from 'react'
import CodeReviewForm from './components/CodeReviewForm'
import CodeReviewResults from './components/CodeReviewResults'
import Header from './components/Header'

function App() {
  const [reviewResult, setReviewResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleReviewSubmit = async (filename, sourceCode) => {
    setIsLoading(true)
    setError(null)
    setReviewResult(null)

    try {
      const response = await fetch('/api/review-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          source_code: sourceCode,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to review code')
      }

      const result = await response.json()
      setReviewResult(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setReviewResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {!reviewResult ? (
              <CodeReviewForm 
                onSubmit={handleReviewSubmit}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <CodeReviewResults 
                result={reviewResult}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
