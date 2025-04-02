import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './farm2table_dashboard.css';
import Farm2TableDashboard from './farm2table_dashboard';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Farm2TableDashboard />
  </React.StrictMode>
);