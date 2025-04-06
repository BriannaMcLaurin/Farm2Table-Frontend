import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <nav className="home-nav">
          <div className="logo">
            <img src="/farm2table-logo.svg" alt="Farm2Table Logo" className="logo-img" />
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
          </div>
        </nav>
        <div className="hero-content">
          <h1>Fresh From Farm to Your Table</h1>
          <p>Connect directly with local farmers and get fresh, organic produce delivered to your doorstep.</p>
          <Link to="/signup" className="cta-button">Get Started</Link>
        </div>
      </header>

      <section className="features-section">
        <h2>Why Choose Farm2Table?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="feature-icon">🌱</i>
            <h3>Fresh & Local</h3>
            <p>Direct connection with local farmers for the freshest produce</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">💰</i>
            <h3>Fair Pricing</h3>
            <p>Transparent pricing with no middlemen</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">🚚</i>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery to your doorstep</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">🌿</i>
            <h3>Organic Options</h3>
            <p>Access to organic and sustainably grown produce</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your account in minutes</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse Products</h3>
            <p>Explore fresh produce from local farmers</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Place Order</h3>
            <p>Select your items and place your order</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Delivery</h3>
            <p>Receive fresh produce at your doorstep</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Farm2Table</h4>
            <p>Connecting farmers and consumers for a sustainable future.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Farm2Table. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 