import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-page-grid">
        <div className="dashboard-card">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">24</span>
              <span className="stat-label">Active Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$1,234</span>
              <span className="stat-label">Today's Revenue</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">New Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">98%</span>
              <span className="stat-label">Customer Satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>New order received from John Smith</li>
            <li>Price update for Strawberries</li>
            <li>New customer registration: Sarah Johnson</li>
            <li>Order #1234 marked as completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 