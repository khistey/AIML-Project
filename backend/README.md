# AI/ML Intern Website - Gemini API Backend

This backend provides AI-powered features using Google's Gemini API for the AI/ML internship website.

## Getting Started

### Prerequisites
- Node.js 18+ 
- Google Gemini API key

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

### Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status and timestamp

### Chat with AI
- **POST** `/api/chat`
- Chat with Gemini AI about the internship
- **Body:**
  ```json
  {
    "message": "What skills do I need for this internship?",
    "context": "internship" // optional: "internship", "technical", "general"
  }
  ```

### Resume Analysis
- **POST** `/api/analyze-resume`
- Analyze a resume for AI/ML internship fit
- **Body:**
  ```json
  {
    "resumeText": "Your resume content as text..."
  }
  ```

### Learning Path Generation
- **POST** `/api/learning-path`
- Generate personalized learning recommendations
- **Body:**
  ```json
  {
    "skillLevel": "beginner", // "beginner", "intermediate", "advanced"
    "interests": "machine learning, AI agents",
    "goals": "Get an AI/ML internship"
  }
  ```

### Technical Q&A
- **POST** `/api/technical-qa`
- Ask technical questions about AI/ML topics
- **Body:**
  ```json
  {
    "question": "How does RAG work in practice?",
    "domain": "rag" // "flowise", "langchain", "rag", "tensorflow", "pytorch", "sso", "oauth"
  }
  ```

## Response Format

All API responses follow this format:
```json
{
  "success": true,
  "response": "AI generated content...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error description",
  "details": "Additional error details"
}
```

## Features

### Security
- Helmet.js for security headers
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Input validation

### AI Capabilities
- Context-aware responses about the internship
- Resume analysis and scoring
- Personalized learning path generation
- Technical Q&A with domain expertise
- RAG-like functionality for knowledge retrieval

### Monitoring
- Request logging with Morgan
- Health check endpoint
- Error handling and logging

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Integration with Frontend

The backend is designed to work with the React frontend. Make sure to:

1. Update the frontend to call these API endpoints
2. Handle loading states and errors gracefully
3. Implement proper error boundaries

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up proper logging and monitoring
4. Configure reverse proxy (nginx)
5. Use HTTPS in production

## Troubleshooting

### Common Issues

1. **"Gemini API key not configured"**
   - Make sure you've added `GEMINI_API_KEY` to your `.env` file
   - Verify the API key is valid and active

2. **CORS errors**
   - Check that `FRONTEND_URL` matches your frontend development server
   - Ensure the frontend is running on the specified port

3. **Rate limiting**
   - If you hit rate limits, wait 15 minutes or adjust the limits in the code

4. **Module not found errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that you're using Node.js 18+

### API Testing

You can test the API endpoints using curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Chat endpoint
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about this internship"}'
```

## License

MIT License - see the main project for details.