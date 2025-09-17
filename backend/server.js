import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AI/ML Intern Website Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Gemini AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context = 'internship' } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required',
        success: false 
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured',
        success: false 
      });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create context-aware prompt based on the website content
    let systemPrompt = '';
    switch (context) {
      case 'internship':
        systemPrompt = `You are an AI assistant for an AI/ML internship website. 
        You help potential candidates understand the role, requirements, and technologies involved.
        The internship focuses on:
        - AI Agent Development with Flowise
        - AI/ML Implementation with TensorFlow, PyTorch, LangChain
        - RAG (Retrieval-Augmented Generation) Systems
        - SSO Integration (OAuth, OpenID)
        - API Integration and Documentation
        - Production AI Applications
        
        Respond helpfully and professionally about these topics and the internship opportunity.
        
        User question: ${message}`;
        break;
      case 'technical':
        systemPrompt = `You are a technical AI assistant specializing in AI/ML technologies.
        Help with questions about Flowise, LangChain, RAG systems, TensorFlow, PyTorch, 
        SSO protocols, and AI agent development.
        
        User question: ${message}`;
        break;
      default:
        systemPrompt = `You are a helpful AI assistant. Please answer the following question:
        
        ${message}`;
    }

    // Generate response
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text,
      context: context,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'Failed to generate AI response',
      success: false,
      details: error.message
    });
  }
});

// Resume analysis endpoint using Gemini
app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ 
        error: 'Resume text is required',
        success: false 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze this resume for an AI/ML internship position. 
    The ideal candidate should have experience with:
    - Machine Learning and Deep Learning fundamentals
    - TensorFlow, PyTorch, LangChain
    - Flowise and RAG understanding
    - SSO protocols (OAuth, OpenID)
    - API integration experience
    - Production AI applications

    Please provide:
    1. Strengths that match the role
    2. Areas for improvement
    3. Overall fit score (1-10)
    4. Specific recommendations

    Resume content:
    ${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({
      success: true,
      analysis: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({
      error: 'Failed to analyze resume',
      success: false,
      details: error.message
    });
  }
});

// Generate learning path endpoint
app.post('/api/learning-path', async (req, res) => {
  try {
    const { skillLevel, interests, goals } = req.body;

    if (!skillLevel) {
      return res.status(400).json({ 
        error: 'Skill level is required',
        success: false 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Create a personalized learning path for someone interested in AI/ML internships.

    Current skill level: ${skillLevel}
    Interests: ${interests || 'General AI/ML'}
    Goals: ${goals || 'Getting an AI/ML internship'}

    Focus on technologies mentioned in our internship:
    - Flowise for AI agent development
    - LangChain for AI applications
    - RAG (Retrieval-Augmented Generation)
    - TensorFlow and PyTorch
    - SSO protocols and API integration

    Provide a structured learning path with:
    1. Beginner level (if applicable)
    2. Intermediate level
    3. Advanced level
    4. Practical projects to build
    5. Timeline estimates
    6. Resources and next steps`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const learningPath = response.text();

    res.json({
      success: true,
      learningPath: learningPath,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Learning Path Error:', error);
    res.status(500).json({
      error: 'Failed to generate learning path',
      success: false,
      details: error.message
    });
  }
});

// Technical Q&A endpoint with RAG-like functionality
app.post('/api/technical-qa', async (req, res) => {
  try {
    const { question, domain } = req.body;

    if (!question) {
      return res.status(400).json({ 
        error: 'Question is required',
        success: false 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create domain-specific context
    const domainContext = {
      'flowise': 'Flowise is a low-code platform for building AI agents and chatbots with visual workflow design.',
      'langchain': 'LangChain is a framework for developing applications powered by language models.',
      'rag': 'RAG (Retrieval-Augmented Generation) combines retrieval systems with generation for knowledge-based AI.',
      'tensorflow': 'TensorFlow is a deep learning framework for building and deploying ML models.',
      'pytorch': 'PyTorch is a deep learning framework known for its dynamic computation graphs.',
      'sso': 'SSO (Single Sign-On) enables users to authenticate once and access multiple applications.',
      'oauth': 'OAuth is an authorization framework for secure API access.',
      'general': 'General AI/ML knowledge and best practices.'
    };

    const context = domainContext[domain] || domainContext['general'];

    const prompt = `You are an expert in AI/ML technologies. Answer this technical question with depth and accuracy.

    Context: ${context}
    
    Question: ${question}
    
    Provide a comprehensive answer that includes:
    1. Direct answer to the question
    2. Technical details and implementation considerations
    3. Best practices and common pitfalls
    4. Real-world applications and examples
    5. Related concepts or technologies`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({
      success: true,
      answer: answer,
      domain: domain,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Technical Q&A Error:', error);
    res.status(500).json({
      error: 'Failed to answer technical question',
      success: false,
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    success: false
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    success: false
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI/ML Intern Website Backend running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`🔑 Gemini API configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
});

export default app;