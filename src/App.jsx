import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
      <Route
        path="/*"
        element={
          currentUser ? (
            <Layout>
              <Routes>
                <Route path="/dashboard" element={isFarmer ? <Dashboard /> : <Navigate to="/market" replace />} />
                <Route path="/market" element={<Market />} />
                <Route path="/market-insights" element={isFarmer ? <MarketInsights /> : <Navigate to="/market" replace />} />
                <Route path="/pricing" element={isFarmer ? <Pricing /> : <Navigate to="/market" replace />} />
                <Route path="/order-table" element={isFarmer ? <OrderTable /> : <Navigate to="/market" replace />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to={isFarmer ? '/dashboard' : '/market'} replace />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
