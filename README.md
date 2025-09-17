# 🤖 AI/ML Intern Website with Gemini AI

A modern, full-stack web application for AI/ML internship recruitment, powered by Google's Gemini AI for intelligent features.

![AI/ML Intern Website](https://img.shields.io/badge/AI%2FML-Intern%20Website-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-orange)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## ✨ Features

### 🎯 Core Features
- **Modern React Frontend** - Built with Vite for fast development
- **AI-Powered Chat Assistant** - Real-time Q&A about the internship using Gemini AI
- **Resume Analyzer** - AI feedback on resume fit for the role
- **Learning Path Generator** - Personalized AI/ML learning recommendations
- **Technical Q&A** - Expert answers about AI/ML technologies
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🔧 Technologies Used
- **Frontend**: React 18, Vite, Modern CSS
- **Backend**: Node.js, Express, Google Gemini AI
- **Deployment**: Docker, Docker Compose, AWS ECR
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **Security**: Helmet.js, CORS, Rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- Docker Desktop ([Download here](https://www.docker.com/products/docker-desktop))
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### 🎯 Option 1: Full Stack with Docker (Recommended)

```powershell
# Clone the repository
git clone https://github.com/yourusername/ai-ml-intern-website.git
cd ai-ml-intern-website

# Deploy with your Gemini API key
.\deploy-fullstack.ps1 -GeminiApiKey "your-api-key-here" -Build
```

### 🛠️ Option 2: Development Mode

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Setup environment variables
cp .env.example .env
cp backend/.env.example backend/.env
# Edit both .env files with your configuration

# Start backend (Terminal 1)
cd backend
npm start

# Start frontend (Terminal 2)
npm run dev
```

### 🌐 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🤖 AI Features

### 1. 💬 Chat Assistant
- **What it does**: Answers questions about internship requirements and technologies
- **How to use**: Click the 🤖 button in the bottom-right corner
- **Example questions**:
  - "What skills do I need for this internship?"
  - "Tell me about Flowise and LangChain"
  - "What's the application process?"

### 2. 📄 Resume Analyzer
- **What it does**: AI analysis of resume against internship requirements
- **Features**: Strength analysis, improvement suggestions, fit scoring
- **Output**: Detailed feedback with actionable recommendations

### 3. 🎯 Learning Path Generator
- **What it does**: Creates personalized AI/ML learning roadmaps
- **Customization**: Based on skill level, interests, and career goals
- **Focus**: Technologies relevant to the internship (Flowise, LangChain, RAG, etc.)

## 📁 Project Structure

```
ai-ml-intern-website/
├── src/                          # React frontend source
│   ├── components/              # AI-powered components
│   │   ├── AIChatBox.jsx       # Chat assistant UI
│   │   ├── ResumeAnalyzer.jsx  # Resume analysis tool
│   │   └── LearningPathGenerator.jsx # Learning recommendations
│   ├── services/
│   │   └── api.js              # API communication service
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── backend/                     # Node.js backend
│   ├── server.js               # Express server with Gemini AI
│   ├── package.json            # Backend dependencies
│   ├── Dockerfile              # Backend container config
│   └── README.md               # Backend documentation
├── docker-compose.yml          # Full-stack orchestration
├── deploy-fullstack.ps1        # Windows deployment script
├── Dockerfile                  # Frontend container config
├── GEMINI_SETUP.md            # Detailed setup guide
└── README.md                   # This file
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/chat` | POST | Chat with AI about internship |
| `/api/analyze-resume` | POST | Analyze resume for role fit |
| `/api/learning-path` | POST | Generate learning recommendations |
| `/api/technical-qa` | POST | Ask technical AI/ML questions |

## 🐳 Docker Deployment

```powershell
# Build and start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔐 Environment Configuration

### Backend Environment (.env)
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**⚠️ Important**: Never commit your `.env` files or API keys to Git!

## 🚨 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `backend/.env` file

## 🛠️ Development

### Adding New AI Features
1. Create new API endpoint in `backend/server.js`
2. Add service method in `src/services/api.js`
3. Create React component in `src/components/`
4. Import and use in `src/App.jsx`

### Customizing AI Responses
Edit the prompts in `backend/server.js` to customize:
- Chat context and personality
- Resume analysis criteria
- Learning path templates
- Technical Q&A domains

## 🚀 Deployment Options

### AWS ECR Deployment
```bash
# Use the included deployment scripts
.\deploy.ps1 -AwsAccountId "your-account-id"
```

### Manual Deployment
1. Build Docker images
2. Push to your container registry
3. Deploy to your cloud platform
4. Configure environment variables
5. Set up load balancer and SSL

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test AI chat endpoint
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about this internship"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **"Gemini API key not configured"**
   - Solution: Add `GEMINI_API_KEY` to `backend/.env`

2. **CORS errors**
   - Solution: Check `FRONTEND_URL` in backend environment

3. **Port conflicts**
   - Solution: Ensure ports 3000 and 5000 are available

4. **Docker build fails**
   - Solution: Ensure Docker Desktop is running

### Getting Help
- Check the [Issues](https://github.com/yourusername/ai-ml-intern-website/issues) page
- Review the detailed setup guide in `GEMINI_SETUP.md`
- Test the health endpoint: http://localhost:5000/api/health

## 🌟 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- UI inspired by modern design principles
- Docker configuration for easy deployment

---

**Made with ❤️ for the future of AI/ML education and recruitment.**

[⭐ Star this repo](https://github.com/yourusername/ai-ml-intern-website) if you found it helpful!