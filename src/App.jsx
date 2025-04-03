import React from 'react';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Dashboard />
      <Profile />
    </Layout>
  );
};

export default App;
