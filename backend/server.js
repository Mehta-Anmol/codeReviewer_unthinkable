const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Code Review API is running' });
});

// Code review endpoint
app.post('/api/review-code', async (req, res) => {
  try {
    const { filename, source_code } = req.body;

    // Validate input
    if (!filename || !source_code) {
      return res.status(400).json({
        error: 'Missing required fields: filename and source_code are required'
      });
    }

    // Try to use Gemini API, fallback to mock response if it fails
    let text;
    try {
      // Get the Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Create the prompt
      const systemInstruction = "You are an expert Senior Software Engineer and Code Reviewer. Your task is to analyze the provided source code for three main areas: Readability and Code Style, Modularity and Architecture, and Potential Bugs or Security Vulnerabilities. Your final output must be a single, structured JSON object.";
      
      const userPrompt = `Review this file named ${filename} with the following code:\n\n\n${source_code}\n\n\nProvide an overall summary (markdown), a list of specific improvement suggestions (markdown), and a risk score (integer from 1-10) for potential issues.`;

      // Generate content
      const result = await model.generateContent([
        {
          text: systemInstruction
        },
        {
          text: userPrompt
        }
      ]);

      const response = await result.response;
      text = response.text();
    } catch (geminiError) {
      console.log('Gemini API not available, using mock response:', geminiError.message);
      
      // Mock response for demonstration
      text = JSON.stringify({
        summary: `## Code Review Summary for ${filename}\n\nThis is a **mock analysis** of your code. The Gemini API is currently not accessible, but this demonstrates the expected output format.\n\n### Analysis Overview\n- **File**: ${filename}\n- **Code Length**: ${source_code.length} characters\n- **Lines**: ${source_code.split('\n').length} lines\n\n### Key Findings\nThis appears to be a code file that requires review. In a real analysis, the AI would examine:\n- Code structure and organization\n- Potential bugs and security issues\n- Best practices and improvements\n- Performance considerations`,
        suggestions: [
          "**Code Organization**: Consider breaking down large functions into smaller, more manageable pieces",
          "**Error Handling**: Add proper try-catch blocks and error handling mechanisms",
          "**Documentation**: Add comments and JSDoc/docstrings to explain complex logic",
          "**Testing**: Implement unit tests to ensure code reliability",
          "**Security**: Review for potential security vulnerabilities and input validation"
        ],
        risk_score: 4
      });
    }

    // Try to parse the response as JSON
    let reviewResult;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        reviewResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      // If parsing fails, create a structured response from the text
      reviewResult = {
        summary: text,
        suggestions: ["Unable to parse structured response from AI"],
        risk_score: 5
      };
    }

    // Validate the response structure
    if (!reviewResult.summary || !reviewResult.suggestions || !reviewResult.risk_score) {
      reviewResult = {
        summary: text || "Code review completed",
        suggestions: ["Unable to parse structured response from AI"],
        risk_score: 5
      };
    }

    res.json(reviewResult);

  } catch (error) {
    console.error('Error in code review:', error);
    res.status(500).json({
      error: 'Failed to process code review',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    details: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
