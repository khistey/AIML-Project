import React, { useState } from 'react';
import apiService from '../services/api';

const LearningPathGenerator = () => {
  const [formData, setFormData] = useState({
    skillLevel: '',
    interests: '',
    goals: ''
  });
  const [learningPath, setLearningPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePath = async () => {
    if (!formData.skillLevel) {
      alert('Please select your current skill level.');
      return;
    }

    setIsLoading(true);
    setLearningPath(null);

    try {
      const response = await apiService.generateLearningPath(
        formData.skillLevel,
        formData.interests,
        formData.goals
      );
      setLearningPath(response.learningPath);
    } catch (error) {
      alert('Failed to generate learning path. Please try again later.');
      console.error('Learning path generation error:', error);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({ skillLevel: '', interests: '', goals: '' });
    setLearningPath(null);
    setShowGenerator(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {!showGenerator ? (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setShowGenerator(true)}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
            }}
          >
            🎯 AI Learning Path Generator
          </button>
          <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
            Get a personalized AI/ML learning roadmap tailored to your background
          </p>
        </div>
      ) : (
        <div
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
              🎯 AI Learning Path Generator
            </h3>
            <button
              onClick={resetForm}
              style={{
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                color: '#666',
                fontSize: '14px',
              }}
            >
              ✕ Close
            </button>
          </div>

          {!learningPath ? (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  📊 Current Skill Level *
                </label>
                <select
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b6b'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                >
                  <option value="">Select your level...</option>
                  <option value="beginner">🌱 Beginner - New to AI/ML</option>
                  <option value="intermediate">🚀 Intermediate - Some experience with basics</option>
                  <option value="advanced">⭐ Advanced - Solid foundation, ready for specialization</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  💡 Areas of Interest
                </label>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Vision, Natural Language Processing, Flowise, LangChain, RAG systems, Deep Learning..."
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b6b'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  🎯 Learning Goals
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  placeholder="e.g., Get this AI/ML internship, build AI agents with Flowise, master RAG systems, become an ML engineer..."
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b6b'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={generatePath}
                  disabled={isLoading || !formData.skillLevel}
                  style={{
                    background: isLoading || !formData.skillLevel 
                      ? '#ccc' 
                      : 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
                    color: 'white',
                    padding: '12px 30px',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLoading || !formData.skillLevel ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isLoading ? '🤔 Generating Path...' : '🚀 Generate My Learning Path'}
                </button>
              </div>

              <div style={{ marginTop: '1.5rem', padding: '15px', background: '#fff3e0', borderRadius: '10px', border: '1px solid #ffcc80' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#e65100', lineHeight: '1.5' }}>
                  <strong>🎓 Note:</strong> Your learning path will be customized based on the technologies and skills 
                  mentioned in this internship posting, including Flowise, LangChain, RAG systems, and production AI deployment.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                  🗺️ Your Personalized Learning Path
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  AI-generated roadmap tailored to your background and goals
                </p>
              </div>

              <div
                style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #e1e5e9',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#333',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  maxHeight: '500px',
                  overflowY: 'auto',
                }}
              >
                {learningPath}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setLearningPath(null);
                    setFormData({ skillLevel: '', interests: '', goals: '' });
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  🔄 Generate New Path
                </button>
                <button
                  onClick={() => {
                    const text = `My AI/ML Learning Path\n\n${learningPath}`;
                    navigator.clipboard.writeText(text);
                    alert('Learning path copied to clipboard!');
                  }}
                  style={{
                    background: 'white',
                    color: '#ff6b6b',
                    padding: '10px 20px',
                    border: '2px solid #ff6b6b',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  📋 Copy to Clipboard
                </button>
                <button
                  onClick={() => window.print()}
                  style={{
                    background: 'white',
                    color: '#ff6b6b',
                    padding: '10px 20px',
                    border: '2px solid #ff6b6b',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  🖨️ Print Path
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningPathGenerator;