import React from 'react';
import Layout from './components/Layout';
import './App.css';

const App = () => {
  return (
    <Layout>
      <div className="dashboard">
        <h1>Welcome to Farm2Table</h1>
        <div className="dashboard-grid">
          <div className="card">
            <h3>Total Orders</h3>
            <p className="number">1,234</p>
          </div>
          <div className="card">
            <h3>Active Customers</h3>
            <p className="number">567</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p className="number">$45,678</p>
          </div>
          <div className="card">
            <h3>Products</h3>
            <p className="number">89</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
