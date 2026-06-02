import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { isAuthOpen, closeAuth, authTab, setAuthTab, login, signup } = useAuth();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
    navigate('/dashboard');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signup(signupName, signupEmail, signupPassword);
    navigate('/dashboard');
  };

  if (!isAuthOpen) return null;

  return (
    <>
      {/* Auth Modal Overlay */}
      <div 
        className={`auth-modal-overlay ${isAuthOpen ? 'active' : ''}`} 
        onClick={closeAuth}
      />

      {/* Auth Modal */}
      <div className={`auth-modal ${isAuthOpen ? 'active' : ''}`}>
        <button className="close-modal" onClick={closeAuth}>
          <i className="fas fa-times"></i>
        </button>
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${authTab === 'login' ? 'active' : ''}`} 
            onClick={() => setAuthTab('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${authTab === 'signup' ? 'active' : ''}`} 
            onClick={() => setAuthTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {authTab === 'login' && (
          <div className="auth-content active" id="login-tab">
            <h2>Welcome Back</h2>
            <p>Enter your details to access your VIP account.</p>
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required 
              />
              <div className="auth-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-pw" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Login
              </button>
            </form>
          </div>
        )}

        {authTab === 'signup' && (
          <div className="auth-content active" id="signup-tab">
            <h2>Create Account</h2>
            <p>Join the VIP club today.</p>
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required 
              />
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthModal;
