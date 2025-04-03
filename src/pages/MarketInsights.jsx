import React from 'react';
import './MarketInsights.css';

const MarketInsights = () => {
  return (
    <div className="farm-dashboard">
      <div className="dashboard-header">
        <h1>Market Insights</h1>
        <p className="subtitle">Real-time market data and analytics</p>
      </div>

      <div className="dashboard-grid">
        <div className="left-section">
          <div className="pricing-card">
            <h2>Current Market Prices</h2>
            <div className="price-display">
              <div className="price-value">$3.45</div>
              <div className="price-label">per kg</div>
            </div>
          </div>

          <div className="chart-card">
            <h2>Price Trends</h2>
            {/* Chart component will go here */}
            <div className="chart-placeholder">
              Price trend visualization
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="category-grid">
            <div className="category-card">
              <h3>Supply Chain Analysis</h3>
              <ul className="category-list">
                <li>Current inventory levels</li>
                <li>Supplier performance metrics</li>
                <li>Logistics efficiency</li>
              </ul>
            </div>

            <div className="category-card">
              <h3>Demand Forecast</h3>
              <ul className="category-list">
                <li>Market demand trends</li>
                <li>Seasonal variations</li>
                <li>Consumer preferences</li>
              </ul>
            </div>

            <div className="category-card">
              <h3>Competitor Analysis</h3>
              <ul className="category-list">
                <li>Market share data</li>
                <li>Pricing strategies</li>
                <li>Product positioning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights; 