import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Cart.css';

function Cart({ cart, updateQuantity, removeFromCart }) {
  useEffect(() => {
    console.log("Cart component received cart:", cart);
  }, [cart]);

  if (!cart || !Array.isArray(cart)) {
    console.error("Invalid cart data:", cart);
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <Link to="/market" className="back-to-market">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Market
          </Link>
        </div>
        <div className="empty-cart">
          <p>Unable to load cart</p>
          <Link to="/market" className="shop-now-btn">Return to Market</Link>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price?.replace('$', '') || '0');
    const quantity = parseInt(item.quantity || '0');
    return sum + (price * quantity);
  }, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <Link to="/market" className="back-to-market">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Market
        </Link>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/market" className="shop-now-btn">Shop Now</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">{item.price}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link 
              to="/checkout" 
              state={{ cart, total: total.toFixed(2) }}
              className="checkout-btn"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default Cart; 