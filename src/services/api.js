// API service for communicating with the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    return this.request('/health');
  }

  // Chat with AI about the internship
  async chat(message, context = 'internship') {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  // Analyze resume for internship fit
  async analyzeResume(resumeText) {
    return this.request('/analyze-resume', {
      method: 'POST',
      body: JSON.stringify({ resumeText }),
    });
  }

  // Generate personalized learning path
  async generateLearningPath(skillLevel, interests, goals) {
    return this.request('/learning-path', {
      method: 'POST',
      body: JSON.stringify({ skillLevel, interests, goals }),
    });
  }

  // Ask technical questions
  async askTechnicalQuestion(question, domain = 'general') {
    return this.request('/technical-qa', {
      method: 'POST',
      body: JSON.stringify({ question, domain }),
    });
  }
}

export default new ApiService();