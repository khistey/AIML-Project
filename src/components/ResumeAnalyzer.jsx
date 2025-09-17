import React, { useState } from 'react';
import apiService from '../services/api';

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume content first.');
      return;
    }

    setIsLoading(true);
    setAnalysis(null);

    try {
      const response = await apiService.analyzeResume(resumeText);
      setAnalysis(response.analysis);
    } catch (error) {
      alert('Failed to analyze resume. Please try again later.');
      console.error('Resume analysis error:', error);
    }

    setIsLoading(false);
  };

  const clearAnalysis = () => {
    setResumeText('');
    setAnalysis(null);
    setShowAnalyzer(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {!showAnalyzer ? (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setShowAnalyzer(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            🤖 AI Resume Analyzer
          </button>
          <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
            Get AI-powered feedback on how well your resume matches this internship
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
              🤖 AI Resume Analyzer
            </h3>
            <button
              onClick={clearAnalysis}
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

          {!analysis ? (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: '#333',
                  }}
                >
                  📄 Paste Your Resume Content:
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Copy and paste your resume text here. Include your experience, skills, education, and projects..."
                  style={{
                    width: '100%',
                    height: '200px',
                    padding: '15px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={analyzeResume}
                  disabled={isLoading || !resumeText.trim()}
                  style={{
                    background: isLoading || !resumeText.trim() 
                      ? '#ccc' 
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '12px 30px',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isLoading || !resumeText.trim() ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isLoading ? '🤔 Analyzing...' : '🚀 Analyze My Resume'}
                </button>
              </div>

              <div style={{ marginTop: '1rem', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                  <strong>💡 Pro tip:</strong> Include details about your AI/ML experience, programming languages, 
                  frameworks (TensorFlow, PyTorch), projects, and any experience with technologies mentioned 
                  in the job description (Flowise, LangChain, RAG, SSO, etc.).
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                  🎯 Resume Analysis Results
                </h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                  AI-powered analysis based on the internship requirements
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
                }}
              >
                {analysis}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setAnalysis(null);
                    setResumeText('');
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  🔄 Analyze Another Resume
                </button>
                <button
                  onClick={() => window.print()}
                  style={{
                    background: 'white',
                    color: '#667eea',
                    padding: '10px 20px',
                    border: '2px solid #667eea',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  🖨️ Print Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;