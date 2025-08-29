// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Page imports
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ProfilePage from './pages/ProfilePage';
import PostJobPage from './pages/PostJobPage';
import PostServicePage from './pages/PostServicePage';
import ViewJobsPage from './pages/ViewJobsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};
const App = () => {
  const [services, setServices] = useState([]);

  // ✅ Fetch from backend on first load
  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error('Failed to fetch services:', err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/listings" element={<ListingsPage services={services} />} />
      <Route path="/post-job" element={<PostJobPage />} />
      <Route path="/jobs" element={<ViewJobsPage />} />
      <Route path="/post-service" element={<PostServicePage />} />
    </Routes>
  );
};

export default App;
