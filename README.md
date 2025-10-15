# Code Review Assistant

A full-stack AI-powered code review application that analyzes your code for quality, architecture, and potential issues using Google's Gemini AI.

## Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini 2.0 Flash to provide intelligent code reviews
- 🎨 **Modern UI**: Beautiful, responsive React interface with Tailwind CSS
- ⚡ **Fast & Efficient**: Built with Vite for lightning-fast development and builds
- 🔍 **Comprehensive Analysis**: Covers readability, architecture, and security issues
- 📊 **Risk Scoring**: Get a 1-10 risk score for potential issues
- 📝 **Markdown Support**: Rich formatting for summaries and suggestions

## Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Markdown** for rich text rendering

### Backend
- **Node.js** with Express.js
- **Google Generative AI** (Gemini 2.0 Flash)
- **CORS** enabled for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (backend + frontend)
npm run install:all
```

### 2. Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp backend/env.example backend/.env
   ```

2. Get your Google Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - **Important**: Make sure your API key has access to Gemini models
   - Copy the key to `backend/.env`:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     PORT=5000
     ```

**Note**: If you encounter "model not found" errors, your API key might not have access to the latest Gemini models. The application includes a fallback mock response for demonstration purposes.

### 3. Run the Application

```bash
# Start both frontend and backend in development mode
npm run dev
```

This will start:
- Backend API server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Enter Filename**: Provide a descriptive filename (e.g., `main.js`, `app.py`)
2. **Paste Code**: Either paste your code directly or upload a file
3. **Submit**: Click "Run Code Review" to analyze your code
4. **Review Results**: View the risk score, summary, and improvement suggestions

## API Endpoints

### POST `/api/review-code`

Analyzes code and returns structured feedback.

**Request Body:**
```json
{
  "filename": "example.js",
  "source_code": "console.log('Hello, World!');"
}
```

**Response:**
```json
{
  "summary": "## Code Analysis Summary\n\nThis is a simple JavaScript file...",
  "suggestions": [
    "Consider adding error handling...",
    "Add JSDoc comments for better documentation..."
  ],
  "risk_score": 3
}
```

## Project Structure

```
code-review-assistant/
├── backend/
│   ├── server.js          # Express.js server
│   ├── package.json       # Backend dependencies
│   └── env.example        # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── package.json           # Root package.json
└── README.md             # This file
```

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Backend server port (default: 5000) | No |

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your Gemini API key is correctly set in `backend/.env`
2. **CORS Issues**: The backend is configured to allow requests from `localhost:3000`
3. **Port Conflicts**: Change the port in `backend/.env` if port 5000 is in use

### Getting Help

- Check the browser console for frontend errors
- Check the terminal running the backend for server errors
- Ensure all dependencies are installed with `npm run install:all`

## License

MIT License - feel free to use this project for your own code review needs!
