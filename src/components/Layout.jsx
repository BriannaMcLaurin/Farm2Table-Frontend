import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { userRole, currentUser } = useAuth();

  useEffect(() => {
    console.log('Layout - Current path:', location.pathname);
    console.log('Layout - User role:', userRole);
    console.log('Layout - Current user:', currentUser ? 'Logged in' : 'Not logged in');
  }, [location, userRole, currentUser]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Force the sidebar to be visible for farmers
  const isFarmer = userRole === 'farmer';
  
  // Check if the current route is a public route
  const isPublicRoute = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="layout">
      {currentUser && (
        <Header 
          onToggleSidebar={toggleSidebar} 
          isSidebarCollapsed={isSidebarCollapsed} 
          showToggle={isFarmer}
          pageTitle={getPageTitle(location.pathname)}
        />
      )}
      <div className={`content-wrapper ${!currentUser ? 'no-header' : ''}`}>
        {currentUser && isFarmer && (
          <Sidebar isCollapsed={isSidebarCollapsed} />
        )}
        <main className={`main-content ${!currentUser ? 'no-header' : ''} ${!isFarmer ? 'no-sidebar' : ''} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

const getPageTitle = (pathname) => {
  const titles = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/market': 'Market',
    '/market-insights': 'Market Insights',
    '/pricing': 'Pricing',
    '/order-table': 'Orders',
    '/profile': 'Profile',
    '/settings': 'Settings',
    '/subscription': 'Subscription',
    '/farmer-subscription': 'Farmer Subscription'
  };
  return titles[pathname] || 'Farm2Table';
};

export default Layout; 