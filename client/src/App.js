import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ClientForm from './components/ClientForm';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import TickSheet from './components/ticksheet';
import SamplePage from './components/SamplePage';
import Calculation from './components/calculation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [clientInfo, setClientInfo] = React.useState(null);


  const handleLogin = () => {
    setIsLoggedIn(true);

    sessionStorage.setItem('isLoggedIn', 'true');
  };


  const handleCreateAccount = () => {
    setIsSignup(true);
  };
  const handleSubmit = (formData) => {
    setIsSubmit(true);
    sessionStorage.setItem('isSubmit', 'true');

    //setClientInfo(formData);
  }
  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    // Check if the submit action was performed when the component mounts
    const storedIsSubmit = sessionStorage.getItem('isSubmit');
    if (storedIsSubmit === 'true') {
      setIsSubmit(true);
    }
  }, []);
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} onCreateAccount={handleCreateAccount} />}
          />
          <Route
            path="/signup"
            element={<SignupPage onCreateAccount={() => setIsSignup(false)} onLogin={handleLogin} />}
          />
          <Route
            path="/client-form"
            element={isLoggedIn ? <ClientForm onSubmit={handleSubmit} /> : <LoginPage onLogin={handleLogin} onCreateAccount={handleCreateAccount} />}
          />

          <Route path="/ticksheet/:index" element={<TickSheet />} />

          <Route
            path="/samplePage"
            element={<SamplePage />}
          />

          <Route path="/" element={isLoggedIn ? <ClientForm /> : <Navigate to="/login" replace />} />

          <Route path="/calculation" element={<Calculation />} />
          
        </Routes>
      </div>
    </Router>


  );
}

export default App;