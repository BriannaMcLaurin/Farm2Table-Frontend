import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const [fontSize, setFontSize] = useState(() => {
    // Get saved font size from localStorage or default to 'medium'
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize || 'medium';
  });

  // Apply theme changes to document
  useEffect(() => {
    // Remove all existing theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    // Add new theme class
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply font size changes
  useEffect(() => {
    // Remove all existing font size classes
    document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
    // Add new font size class
    document.documentElement.classList.add(`font-${fontSize}`);
    
    // Save font size preference
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const updateFontSize = (newFontSize) => {
    setFontSize(newFontSize);
  };

  const value = {
    theme,
    fontSize,
    updateTheme,
    updateFontSize
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 