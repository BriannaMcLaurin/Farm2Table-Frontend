import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MarketInsights from './pages/MarketInsights';
import Pricing from './pages/Pricing';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Login from './components/Login';
import SignUp from './components/Signup';
import FarmerSignUp from './components/Farmer';
import './App.css';

const App = () => {
  // TODO: Replace with actual auth check
  const isAuthenticated = false;

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/farmer-signup" element={<FarmerSignUp />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/market-insights"
              element={
                isAuthenticated ? (
                  <MarketInsights />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/pricing"
              element={
                isAuthenticated ? <Pricing /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/orders"
              element={
                isAuthenticated ? <Orders /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
