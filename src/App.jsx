import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Market from './Market';
import Dashboard from './pages/Dashboard';
import MarketInsights from './pages/MarketInsights';
import Pricing from './pages/Pricing';
import OrderTable from './pages/OrderTable';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Home from './pages/Home';
import './App.css';
import './styles/theme.css';

function AppRoutes() {
  const { currentUser, userRole } = useAuth();
  
  // Force the routing based on user role
  const isFarmer = userRole === 'farmer';
  console.log('App - Current user role:', userRole);
  console.log('App - Is farmer:', isFarmer);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={!currentUser ? <Home /> : <Navigate to={isFarmer ? '/dashboard' : '/market'} replace />} />
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={isFarmer ? '/dashboard' : '/market'} replace />} />
      <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to={isFarmer ? '/dashboard' : '/market'} replace />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/market" element={currentUser ? <Market /> : <Navigate to="/login" replace />} />
      <Route path="/market-insights" element={currentUser ? <MarketInsights /> : <Navigate to="/login" replace />} />
      <Route path="/pricing" element={currentUser ? <Pricing /> : <Navigate to="/login" replace />} />
      <Route path="/order-table" element={currentUser ? <OrderTable /> : <Navigate to="/login" replace />} />
      <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" replace />} />
      <Route path="/settings" element={currentUser ? <Settings /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
