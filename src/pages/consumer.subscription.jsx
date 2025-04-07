import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../pages/consumer-subscription.css';

const ConsumerSubscription = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const togglePricing = () => {
    setIsYearly(!isYearly);
  };

  const handleSkipSubscription = () => {
    // Redirect to market page when user chooses to continue without subscribing
    navigate('/market');
  };

  const handleSubscribe = (planName) => {
    // Handle subscription logic here
    console.log('Subscribing to plan:', planName, 'with period:', isYearly ? 'yearly' : 'monthly');
    // After successful subscription, redirect to market
    navigate('/market');
  };

  const plans = [
    {
      name: 'Basic',
      monthlyPrice: '$9.99',
      yearlyPrice: '$95.88',
      features: [
        'Free Shipping on Orders',
        'Access to Basic Deals',
        'Standard Support'
      ]
    },
    {
      name: 'Premium',
      monthlyPrice: '$14.99',
      yearlyPrice: '$143.88',
      features: [
        'Free Shipping on All Orders',
        'Access to Premium Deals',
        'Priority Support',
        'Early Access to Sales'
      ],
      isPopular: true
    },
    {
      name: 'Family',
      monthlyPrice: '$19.99',
      yearlyPrice: '$191.88',
      features: [
        'Free Shipping on All Orders',
        'Access to All Deals',
        '24/7 Priority Support',
        'Family Sharing (up to 5 members)',
        'Exclusive Member Events'
      ]
    }
  ];

  return (
    <div className="subscription-container">
      <div className="page-section">
        <h2 className="section-title">Consumer Subscription Plans</h2>
        <div className="section-divider"></div>
      </div>

      <div className="pricing-header">
        <h1 className="title">Choose Your Plan</h1>
        <p className="subtitle">Select the perfect plan for your shopping needs</p>

        <div className="pricing-toggle">
          <span className="toggle-label">Monthly</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isYearly}
              onChange={togglePricing}
            />
            <span className="slider round"></span>
          </label>
          <span className="toggle-label">Yearly <span className="discount">(Save 20%)</span></span>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.isPopular ? 'featured' : ''}`}>
            {plan.isPopular && <div className="popular-tag">Most Popular</div>}
            <h2>{plan.name}</h2>
            <div className="price">
              <span className={`monthly-price ${isYearly ? 'hidden' : ''}`}>
                {plan.monthlyPrice}<span className="period">/month</span>
              </span>
              <span className={`yearly-price ${!isYearly ? 'hidden' : ''}`}>
                {plan.yearlyPrice}<span className="period">/year</span>
              </span>
            </div>
            <ul className="features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <button 
              className="subscribe-btn" 
              onClick={() => handleSubscribe(plan.name)}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>

      {/* Show the "Continue without Subscription" button regardless of login status */}
      <div className="no-subscription">
        <button className="skip-subscription-btn" onClick={handleSkipSubscription}>Continue without Subscription</button>
        <p className="skip-note">You can always subscribe later</p>
      </div>
    </div>
  );
};

export default ConsumerSubscription;
