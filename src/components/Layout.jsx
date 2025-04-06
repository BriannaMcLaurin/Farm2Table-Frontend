import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const { userRole } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Force the sidebar to be visible for farmers
  const isFarmer = userRole === 'farmer';
  console.log('Current user role:', userRole);
  console.log('Is farmer:', isFarmer);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="layout">
      <Header 
        onToggleSidebar={toggleSidebar} 
        isSidebarCollapsed={isSidebarCollapsed} 
        showToggle={isFarmer} 
      />
      <div className="content-wrapper">
        {isFarmer && (
          <Sidebar isCollapsed={isSidebarCollapsed} />
        )}
        <main className={`main-content ${!isFarmer ? 'no-sidebar' : ''} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 