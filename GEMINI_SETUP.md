# 🤖 AI/ML Intern Website with Gemini API

A modern, full-stack web application for AI/ML internship recruitment, powered by Google's Gemini AI for intelligent features.

## ✨ Features

### 🎯 Core Features
- **Modern React Frontend** - Built with Vite for fast development
- **AI-Powered Chat Assistant** - Real-time Q&A about the internship
- **Resume Analyzer** - AI feedback on resume fit for the role
- **Learning Path Generator** - Personalized AI/ML learning recommendations
- **Technical Q&A** - Expert answers about AI/ML technologies
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🔧 Technologies
- **Frontend**: React 18, Vite, Modern CSS
- **Backend**: Node.js, Express, Google Gemini AI
- **Deployment**: Docker, Docker Compose
- **AI Integration**: Google Generative AI (@google/generative-ai)

## 🚀 Quick Start

### Prerequisites
1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
3. **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

### 🎯 Option 1: Full Stack with Docker (Recommended)

1. **Get your Gemini API key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in and create a new API key
   - Copy the key

2. **Clone and deploy**:
   ```powershell
   # Windows PowerShell
   .\deploy-fullstack.ps1 -GeminiApiKey "your-api-key-here" -Build
   
   # This will:
   # - Build both frontend and backend Docker images
   # - Configure environment variables
   # - Start all services
   # - Show you the URLs to access the application
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health check: http://localhost:5000/api/health

### 🛠️ Option 2: Development Mode

1. **Setup backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   npm run dev
   ```

2. **Setup frontend** (in new terminal):
   ```bash
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Access**:
   - Frontend: http://localhost:5173 (Vite dev server)
   - Backend: http://localhost:5000

## 🤖 AI Features

### 1. Chat Assistant
- **What it does**: Answers questions about the internship, requirements, and technologies
- **How to use**: Click the chat button (🤖) in the bottom-right corner
- **Example questions**:
  - "What skills do I need for this internship?"
  - "Tell me about Flowise and how it's used here"
  - "What's the application process?"

### 2. Resume Analyzer
- **What it does**: Analyzes your resume against the internship requirements
- **How to use**: Click "AI Resume Analyzer" button, paste your resume text
- **Output**: Strengths, areas for improvement, fit score, and recommendations

### 3. Learning Path Generator
- **What it does**: Creates personalized learning roadmaps
- **How to use**: Click "AI Learning Path Generator", fill out the form
- **Customized for**: Your skill level, interests, and career goals

### 4. Technical Q&A
- **What it does**: Answers technical questions about AI/ML topics
- **Available via**: API endpoint `/api/technical-qa`
- **Domains**: Flowise, LangChain, RAG, TensorFlow, PyTorch, SSO, OAuth

## 📁 Project Structure

```
ai-ml-intern-website/
├── src/                          # React frontend source
│   ├── components/              # AI-powered components
│   │   ├── AIChatBox.jsx       # Chat assistant
│   │   ├── ResumeAnalyzer.jsx  # Resume analysis
│   │   └── LearningPathGenerator.jsx
│   ├── services/
│   │   └── api.js              # API communication service
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # React entry point
├── backend/                     # Node.js backend
│   ├── server.js               # Express server with Gemini AI
│   ├── package.json            # Backend dependencies
│   ├── Dockerfile              # Backend container config
│   └── .env.example            # Environment template
├── docker-compose.yml          # Full-stack orchestration
├── deploy-fullstack.ps1        # Deployment script
├── Dockerfile                  # Frontend container config
└── README.md                   # This file
```

## 🔧 API Endpoints

### Backend API (http://localhost:5000/api)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/chat` | POST | Chat with AI about internship |
| `/analyze-resume` | POST | Analyze resume for role fit |
| `/learning-path` | POST | Generate learning recommendations |
| `/technical-qa` | POST | Ask technical AI/ML questions |

### Example API Usage

```javascript
// Chat with AI
const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "What technologies will I work with?",
    context: "internship"
  })
});
```

## 🐳 Docker Commands

```powershell
# Start everything
.\deploy-fullstack.ps1 -GeminiApiKey "your-key" -Build

# View logs
.\deploy-fullstack.ps1 -Logs

# Stop services
.\deploy-fullstack.ps1 -Stop

# Rebuild and restart
.\deploy-fullstack.ps1 -GeminiApiKey "your-key" -Build
```

## 🔐 Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🛠️ Development

### Adding New AI Features

1. **Create new API endpoint** in `backend/server.js`
2. **Add service method** in `src/services/api.js`
3. **Create React component** in `src/components/`
4. **Import and use** in `src/App.jsx`

### Customizing AI Responses

Edit the prompts in `backend/server.js`:
- Chat context prompts
- Resume analysis criteria
- Learning path templates
- Technical Q&A domains

## 🚨 Troubleshooting

### Common Issues

1. **"Gemini API key not configured"**
   ```
   Solution: Add GEMINI_API_KEY to backend/.env file
   ```

2. **CORS errors**
   ```
   Solution: Check FRONTEND_URL in backend environment
   ```

3. **Docker build fails**
   ```
   Solution: Ensure Docker Desktop is running and try: 
   docker system prune -a
   ```

4. **Port conflicts**
   ```
   Solution: Stop other services on ports 3000/5000:
   netstat -ano | findstr :3000
   netstat -ano | findstr :5000
   ```

### Getting Help

1. **Check service health**: http://localhost:5000/api/health
2. **View logs**: `.\deploy-fullstack.ps1 -Logs`
3. **Restart services**: `.\deploy-fullstack.ps1 -Stop` then restart

## 🚀 Deployment to Production

### AWS Deployment
- Use the existing ECR deployment scripts
- Update environment variables for production
- Set up load balancer for both frontend and backend
- Configure HTTPS with SSL certificates

### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
GEMINI_API_KEY=your_production_api_key
```

## 📝 License

MIT License - Feel free to use this project as a template for your own AI-powered applications.

## 🤝 Contributing

This project demonstrates modern full-stack development with AI integration. Feel free to:
- Add new AI features
- Improve the UI/UX
- Optimize performance
- Add tests
- Enhance documentation

---

**Built with ❤️ for the future of AI/ML education and recruitment.**