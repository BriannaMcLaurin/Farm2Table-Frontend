import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import '../consumer-subscription.css';

const ConsumerSubscription = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const pricingOptions = {
    monthly: {
      price: 9.99,
      label: 'month'
    },
    semiannual: {
      price: 54.99, // 9.99 * 6 = 59.94, discounted to 54.99
      label: '6 months'
    },
    annual: {
      price: 99.99, // 9.99 * 12 = 119.88, discounted to 99.99
      label: 'year'
    }
  };

  const handlePeriodChange = (period) => {
    setBillingPeriod(period);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="app-container">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="main-content">
        <div className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {isCollapsed ? '☰' : '✕'}
          </button>
          <h1>Buyer Subscription Plans</h1>
        </div>

        <div className="subscription-container">
          <h2 className="subscription-title">Choose Your Prime Plan</h2>

          <div className="subscription-plan">
            <div className="plan-header">
              <h3>Prime</h3>
              <div className="price">
                <span className="amount">${pricingOptions[billingPeriod].price}</span>
                <span className="period">/{pricingOptions[billingPeriod].label}</span>
              </div>
            </div>

            <div className="plan-benefits">
              <ul>
                <li>Free Shipping on All Orders</li>
                <li>Access to Prime-Only Deals</li>
              </ul>
            </div>
          </div>

          <div className="billing-period-toggle">
            <div className="toggle-label">Billing Period</div>
            <div className="toggle-container">
              <button
                className={`period-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('monthly')}
              >
                Monthly
              </button>
              <button
                className={`period-option ${billingPeriod === 'semiannual' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('semiannual')}
              >
                6 Months
              </button>
              <button
                className={`period-option ${billingPeriod === 'annual' ? 'active' : ''}`}
                onClick={() => handlePeriodChange('annual')}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="subscription-actions">
            <button className="subscribe-button">Subscribe Now</button>
            <button className="skip-button">Continue Without Subscribing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerSubscription;
