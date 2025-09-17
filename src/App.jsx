import React from 'react'
import './index.css'
import AIChatBox from './components/AIChatBox'
import ResumeAnalyzer from './components/ResumeAnalyzer'
import LearningPathGenerator from './components/LearningPathGenerator'

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">AI/ML Internship</div>
            <nav>
              <ul className="nav">
                <li><a href="#responsibilities">Responsibilities</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#technologies">Technologies</a></li>
                <li><a href="#apply">Apply</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>AI/ML + Flowise Intern</h1>
          <p>Join our team and work on cutting-edge AI/ML technologies with Flowise and intelligent automation</p>
          <a href="#apply" className="cta-button">Apply Now</a>
        </div>
      </section>

      {/* Technology Icons */}
      <section className="container">
        <div className="tech-icons">
          <div className="tech-icon">AI/ML</div>
          <div className="tech-icon">Flowise</div>
          <div className="tech-icon">PyTorch</div>
          <div className="tech-icon">TensorFlow</div>
          <div className="tech-icon">LangChain</div>
          <div className="tech-icon">RAG</div>
          <div className="tech-icon">SSO</div>
          <div className="tech-icon">OAuth</div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section id="responsibilities" className="section">
        <div className="container">
          <h2>Key Responsibilities</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>🤖 AI Agent Development</h3>
              <p>Build and integrate AI agents using Flowise or similar frameworks to create intelligent automation solutions</p>
            </div>
            <div className="card">
              <h3>🧠 AI/ML Implementation</h3>
              <p>Work on AI/ML use cases to embed intelligent features into the platform and enhance user experience</p>
            </div>
            <div className="card">
              <h3>🔐 SSO Integration</h3>
              <p>Implement and manage Single Sign-On (SSO) solutions for seamless user authentication across platforms</p>
            </div>
            <div className="card">
              <h3>🔗 API Integration</h3>
              <p>Collaborate with developers for AI/ML API/model integrations and ensure smooth data flow</p>
            </div>
            <div className="card">
              <h3>📚 Documentation</h3>
              <p>Contribute to documentation and research of AI-powered functionalities for knowledge sharing</p>
            </div>
            <div className="card">
              <h3>🚀 Production Implementation</h3>
              <p>Apply cutting-edge technologies in production environments with focus on scalability and performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <h2>Required & Preferred Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>🎯 Core Requirements</h3>
              <ul className="skill-list">
                <li>Strong ML & DL fundamentals</li>
                <li>TensorFlow, PyTorch, LangChain</li>
                <li>Flowise & RAG understanding</li>
                <li>SSO protocols (OAuth, OpenID)</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>💻 Technical Skills</h3>
              <ul className="skill-list">
                <li>API integration experience</li>
                <li>Data preprocessing</li>
                <li>Production AI applications</li>
                <li>Conversational AI agents</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>🌟 Preferred Experience</h3>
              <ul className="skill-list">
                <li>AI/ML project portfolio</li>
                <li>GitHub contributions</li>
                <li>Production deployment</li>
                <li>Research publications</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>🚀 Personal Qualities</h3>
              <ul className="skill-list">
                <li>Eagerness to learn</li>
                <li>Problem-solving mindset</li>
                <li>Team collaboration</li>
                <li>Innovation focus</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="section">
        <div className="container">
          <h2>Technologies You'll Work With</h2>
          <div className="cards-grid">
            <div className="card">
              <h3>🔮 Flowise</h3>
              <p>Low-code platform for building AI agents and chatbots with visual workflow design and easy integration capabilities</p>
            </div>
            <div className="card">
              <h3>🧠 LangChain</h3>
              <p>Framework for developing applications powered by language models with advanced chain-of-thought reasoning</p>
            </div>
            <div className="card">
              <h3>🔍 RAG Systems</h3>
              <p>Retrieval-Augmented Generation for building AI systems that can access and use external knowledge bases</p>
            </div>
            <div className="card">
              <h3>🤖 TensorFlow/PyTorch</h3>
              <p>Deep learning frameworks for building, training, and deploying machine learning models at scale</p>
            </div>
            <div className="card">
              <h3>🔐 OAuth & SSO</h3>
              <p>Modern authentication protocols for secure user access management and seamless login experiences</p>
            </div>
            <div className="card">
              <h3>☁️ Production AI</h3>
              <p>Real-world deployment of AI models with monitoring, scaling, and performance optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Tools Section */}
      <section className="section">
        <div className="container">
          <h2>🤖 AI-Powered Career Tools</h2>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem', color: '#666' }}>
            Use our AI assistant to get personalized help with your application, resume analysis, and learning recommendations.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <ResumeAnalyzer />
            <LearningPathGenerator />
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="section">
        <div className="container">
          <h2>Ready to Join Our Team?</h2>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
              We're looking for passionate individuals who want to work at the forefront of AI/ML technology. 
              If you're excited about building intelligent systems and have the skills we're looking for, we'd love to hear from you!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:careers@company.com" className="cta-button">Send Resume</a>
              <a href="#" className="cta-button" style={{ background: '#667eea' }}>View Portfolio</a>
            </div>
            
            <div style={{ marginTop: '2rem', padding: '20px', background: '#f0f8ff', borderRadius: '15px', border: '2px solid #e1f5fe' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#0277bd' }}>
                💡 <strong>Pro tip:</strong> Use our AI chat assistant (bottom right) to ask questions about the role, 
                get your resume analyzed, or generate a personalized learning path before applying!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 AI/ML Internship Program. Building the future with artificial intelligence.</p>
        </div>
      </footer>
      
      {/* AI Chat Assistant */}
      <AIChatBox />
    </div>
  )
}

export default App