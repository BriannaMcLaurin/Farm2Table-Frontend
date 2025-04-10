import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';

function Checkout({ cart }) {
  const [step, setStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    instructions: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateTotal = () => {
    if (!cart || !Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const total = calculateTotal();

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
    setStep(2);
  };

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeliveryInfoSubmit = (e) => {
    e.preventDefault();
    if (deliveryOption === 'delivery') {
      setStep(3); // Go to payment step for delivery
    } else {
      setStep(4); // Skip to review for pickup
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Go to review step
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setStep(5); // Show confirmation screen
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <Link to="/" className="back-to-market">
          ← Back to Market
        </Link>
      </div>

      <div className="checkout-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart && cart.map(item => {
            const price = parseFloat(item.price.replace('$', '')) || 0;
            const quantity = parseInt(item.quantity) || 0;
            const itemTotal = price * quantity;
            
            return (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {quantity}</p>
                  <p>Price: ${itemTotal.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          <div className="total-section">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>

        <div className="checkout-steps">
          {step === 1 && (
            <div className="delivery-options">
              <h2>Choose Delivery Option</h2>
              <div className="option-buttons">
                <button
                  className={`option-button ${deliveryOption === 'pickup' ? 'active' : ''}`}
                  onClick={() => handleDeliveryOptionChange('pickup')}
                >
                  Pickup
                </button>
                <button
                  className={`option-button ${deliveryOption === 'delivery' ? 'active' : ''}`}
                  onClick={() => handleDeliveryOptionChange('delivery')}
                >
                  Delivery
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="delivery-info">
              <h2>{deliveryOption === 'pickup' ? 'Pickup Information' : 'Delivery Information'}</h2>
              <form onSubmit={handleDeliveryInfoSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={deliveryInfo.name}
                    onChange={handleDeliveryInfoChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={deliveryInfo.phone}
                    onChange={handleDeliveryInfoChange}
                    required
                  />
                </div>
                {deliveryOption === 'delivery' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={deliveryInfo.address}
                        onChange={handleDeliveryInfoChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={deliveryInfo.city}
                          onChange={handleDeliveryInfoChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={deliveryInfo.state}
                          onChange={handleDeliveryInfoChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="zip">ZIP Code</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={deliveryInfo.zip}
                          onChange={handleDeliveryInfoChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="form-group">
                  <label htmlFor="instructions">Special Instructions</label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    value={deliveryInfo.instructions}
                    onChange={handleDeliveryInfoChange}
                    rows="3"
                  />
                </div>
                <button type="submit" className="continue-button">
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="payment-section">
              <h2>Payment Information</h2>
              <form onSubmit={handlePaymentSubmit}>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="continue-button">
                  Continue to Review
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="order-review">
              <h2>Review Your Order</h2>
              <div className="review-section">
                <h3>Delivery Method</h3>
                <p>{deliveryOption === 'pickup' ? 'Pickup' : 'Delivery'}</p>
              </div>
              <div className="review-section">
                <h3>Contact Information</h3>
                <p>Name: {deliveryInfo.name}</p>
                <p>Phone: {deliveryInfo.phone}</p>
              </div>
              {deliveryOption === 'delivery' && (
                <>
                  <div className="review-section">
                    <h3>Delivery Address</h3>
                    <p>{deliveryInfo.address}</p>
                    <p>{deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zip}</p>
                  </div>
                  <div className="review-section">
                    <h3>Payment Information</h3>
                    <p>Card ending in: {paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                </>
              )}
              {deliveryInfo.instructions && (
                <div className="review-section">
                  <h3>Special Instructions</h3>
                  <p>{deliveryInfo.instructions}</p>
                </div>
              )}
              <button onClick={handleCompleteOrder} className="complete-order-button">
                Complete Order
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="confirmation-screen">
              <h2>Thank You for Your Order!</h2>
              <div className="confirmation-message">
                <p>Your order has been received and is being processed.</p>
                {deliveryOption === 'pickup' ? (
                  <p>Please come to our location to pick up your order.</p>
                ) : (
                  <p>Your order will be delivered to the provided address.</p>
                )}
                <p>Order Total: ${total.toFixed(2)}</p>
              </div>
              <Link to="/" className="back-to-market">
                Return to Market
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout; 