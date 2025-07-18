import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import { useDarkMode } from './hooks/useDarkMode';
import { useToast } from './hooks/useToast';
import ToastContainer from './components/Toast';
import ThemeToggle from './components/ThemeToggle';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Customers from './components/Customers';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const toast = useToast();

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
setUser(userData); // Set to state
   
    
  };





  //user data fetch from local storage
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser)); // Restore user from localStorage
  }
}, []);
      
  
  
        
  
    


  const handleLogout = () => {
    setUser(null);
     localStorage.removeItem("user"); 
    setActiveTab('dashboard');
    toast.info('Logged Out', 'You have been successfully logged out.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard isDarkMode={isDarkMode} />;
      case 'products':
        return <Products toast={toast} />;
      case 'orders':
        return <Orders toast={toast} />;
      case 'customers':
        return <Customers toast={toast} />;
      case 'analytics':
        return <Analytics isDarkMode={isDarkMode} toast={toast} />;
      case 'settings':
        return <Settings toast={toast} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} user={user} />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} toast={toast} />
        <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      </>
    );
  }

  return (
    <div className="app">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <h1 className="header-title">Ecommerce Dashboard</h1>
          </div>
          <div className="header-actions">
            <div className="user-info">
              <span className="user-name">Welcome, {user.name}</span>
            </div>
            <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="content">
          {renderContent()}
        </div>
      </main>
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  );
}

export default App;