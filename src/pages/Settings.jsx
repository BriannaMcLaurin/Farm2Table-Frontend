import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css';

const Settings = () => {
  const { currentUser } = useAuth();
  const { theme, fontSize, updateTheme, updateFontSize } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      orderUpdates: true,
      priceAlerts: true,
      marketInsights: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    }
  });
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

  const handleNotificationChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting]
      }
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }));
  };

  const handleThemeChange = (newTheme) => {
    updateTheme(newTheme);
  };

  const handleFontSizeChange = (newFontSize) => {
    updateFontSize(newFontSize);
  };

  const handleSave = async () => {
    try {
      // Here you would typically save to your backend
      setSaveMessage({
        type: 'success',
        text: 'Settings saved successfully!'
      });
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSaveMessage({ type: '', text: '' });
      }, 3000);
    } catch (error) {
      setSaveMessage({
        type: 'error',
        text: 'Failed to save settings. Please try again.'
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="settings-page">
        <div className="settings-header">
          <h1>Settings</h1>
        </div>
        <div className="settings-content">
          <p>Please log in to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      {saveMessage.text && (
        <div className={`save-message ${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}

      <div className="settings-content">
        <section className="settings-section">
          <h2>Notification Preferences</h2>
          <div className="settings-group">
            <div className="setting-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className="slider"></span>
              </label>
              <div className="setting-label">
                <span>Email Notifications</span>
                <p>Receive updates via email</p>
              </div>
            </div>

            <div className="setting-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span className="slider"></span>
              </label>
              <div className="setting-label">
                <span>Push Notifications</span>
                <p>Receive push notifications in browser</p>
              </div>
            </div>

            <div className="setting-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.orderUpdates}
                  onChange={() => handleNotificationChange('orderUpdates')}
                />
                <span className="slider"></span>
              </label>
              <div className="setting-label">
                <span>Order Updates</span>
                <p>Get notified about order status changes</p>
              </div>
            </div>

            <div className="setting-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.priceAlerts}
                  onChange={() => handleNotificationChange('priceAlerts')}
                />
                <span className="slider"></span>
              </label>
              <div className="setting-label">
                <span>Price Alerts</span>
                <p>Get notified about price changes</p>
              </div>
            </div>

            <div className="setting-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.marketInsights}
                  onChange={() => handleNotificationChange('marketInsights')}
                />
                <span className="slider"></span>
              </label>
              <div className="setting-label">
                <span>Market Insights</span>
                <p>Receive market analysis and trends</p>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2>Privacy Settings</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-label">
                <span>Profile Visibility</span>
                <p>Control who can see your profile</p>
              </div>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                className="select-input"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="contacts">Contacts Only</option>
              </select>
            </div>

            <div className="setting-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.showEmail}
                  onChange={() => handlePrivacyChange('showEmail', !settings.privacy.showEmail)}
                />
                <span className="slider"></span>
              </label>
              <div className="setting-label">
                <span>Show Email</span>
                <p>Display email address on profile</p>
              </div>
            </div>

            <div className="setting-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.showPhone}
                  onChange={() => handlePrivacyChange('showPhone', !settings.privacy.showPhone)}
                />
                <span className="slider"></span>
              </label>
              <div className="setting-label">
                <span>Show Phone</span>
                <p>Display phone number on profile</p>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2>Theme Settings</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-label">
                <span>Theme Mode</span>
                <p>Choose your preferred theme</p>
              </div>
              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="select-input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <span>Font Size</span>
                <p>Adjust the text size</p>
              </div>
              <select
                value={fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                className="select-input"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings; 