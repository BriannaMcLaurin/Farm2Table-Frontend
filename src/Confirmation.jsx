import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-icon">✓</div>
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been received and is being processed.</p>
        <p>We'll send you an email confirmation shortly.</p>
        <div className="confirmation-actions">
          <Link to="/market" className="back-to-market">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmation; 