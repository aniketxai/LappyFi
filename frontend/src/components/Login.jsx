import React, { useState,useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';


const Login = ({ onLogin, toast }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  //GET AUth Token
     const [accessToken, setAccessToken] = useState(null);


      

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("access_token");

    if (tokenFromURL) {
      setAccessToken(tokenFromURL);
      localStorage.setItem("access_token", tokenFromURL);
      console.log("Saved token:", tokenFromURL);
    } else {
      const stored = localStorage.getItem("access_token");
      setAccessToken(stored);
      console.log("Token from localStorage:", stored);
    }
  }, []);

  const getAuthUrl = async () => {
  const res = await fetch(import.meta.env.VITE_AURL);
   const data = await res.json();
    window.location.href = data.url;
    alert("Post created!");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
    fetch(`${import.meta.env.VITE_CALLBACK_URL}?code=${code}`)

        .then(res => res.json())
        .then(tokens => {
          setAccessToken(tokens.access_token);
          localStorage.setItem("access_token", tokens.access_token);
        });
    }
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


  

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Login validation
        if (formData.email === 'admin@example.com' && formData.password === 'admin123' ) {
          getAuthUrl();
          
          toast.success('Login Successful', 'Welcome back to your dashboard!');
        

         
          onLogin({
            name: 'Aniket',
            email: formData.email,
            role: 'Administrator'
          });
        } else {
          toast.error('Login Failed', 'Invalid email or password. Try admin@example.com / admin123');
        }
      } else {
        // Registration validation
        if (formData.password !== formData.confirmPassword) {
          toast.error('Registration Failed', 'Passwords do not match');
        } else if (formData.password.length < 6) {
          toast.error('Registration Failed', 'Password must be at least 6 characters');
        } else {
          toast.success('Registration Successful', 'Account created successfully! Please login.');
          setIsLogin(true);
          setFormData({ ...formData, password: '', confirmPassword: '' });
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">
              <Building className="w-6 h-6" />
            </div>
            <h1 className="logo-text">LappyFi</h1>
          </div>
          <h2 className="login-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="login-subtitle">
            {isLogin 
              ? 'Sign in to access your dashboard' 
              : 'Join us to manage your ecommerce business'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Company (Optional)</label>
              <div className="input-wrapper">
                <Building className="input-icon" size={18} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingRight: '2.75rem' }}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="link-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <p className="demo-text">Email: admin@example.com</p>
            <p className="demo-text">Password: admin123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
