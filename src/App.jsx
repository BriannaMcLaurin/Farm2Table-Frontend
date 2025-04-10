import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Market from './Market';
import FarmPage from './FarmPage';
import Cart from './Cart';
import Checkout from './Checkout';
import { products } from './Market'; // Make sure to export products from Market.jsx
import './App.css'

function App() {
  // Initialize cart from localStorage or empty array
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

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Market 
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <Checkout cart={cart} />
          } 
        />
        <Route path="/farm/:farmName" element={<FarmPage products={products} addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
