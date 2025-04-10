import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import ConsumerSubscription from './pages/consumer.subscription';
import FarmerSubscription from './pages/farmer-subscriptions';
import Cart from './Cart';
import Checkout from './Checkout';
import FarmPage from './FarmPage';
import './App.css';
import './styles/theme.css';

// Debug component to log route changes
function RouteDebugger() {
  const location = useLocation();
  const { userRole } = useAuth();
  
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    console.log('Current user role:', userRole);
  }, [location, userRole]);
  
  return null;
}

function AppRoutes() {
  const { currentUser, userRole } = useAuth();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };
  
  // Force the routing based on user role
  const isFarmer = userRole === 'farmer';
  console.log('App - Current user role:', userRole);
  console.log('App - Is farmer:', isFarmer);

  return (
    <>
      <RouteDebugger />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={!currentUser ? <Home /> : <Navigate to={isFarmer ? '/dashboard' : '/market'} replace />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={isFarmer ? '/dashboard' : '/market'} replace />} />
        <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to={isFarmer ? '/dashboard' : '/market'} replace />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/market" element={currentUser ? <Market cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /> : <Navigate to="/login" replace />} />
        <Route path="/cart" element={currentUser ? <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} /> : <Navigate to="/login" replace />} />
        <Route path="/checkout" element={currentUser ? <Checkout cart={cart} /> : <Navigate to="/login" replace />} />
        <Route path="/farm/:farmName" element={currentUser ? <FarmPage addToCart={addToCart} /> : <Navigate to="/login" replace />} />
        <Route path="/market-insights" element={currentUser ? <MarketInsights /> : <Navigate to="/login" replace />} />
        <Route path="/pricing" element={currentUser ? <Pricing /> : <Navigate to="/login" replace />} />
        <Route path="/order-table" element={currentUser ? <OrderTable /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Navigate to="/login" replace />} />
        <Route path="/subscription" element={currentUser ? <ConsumerSubscription /> : <Navigate to="/login" replace />} />
        <Route path="/farmer-subscription" element={currentUser ? <FarmerSubscription /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
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
