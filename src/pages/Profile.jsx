import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/Firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { currentUser, deleteAccount, userRole } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    company: '',
    location: '',
    bio: '',
  });

  const [activityHistory, setActivityHistory] = useState([
    {
      id: 1,
      action: 'Updated market insights',
      date: '2024-03-15 14:30',
      type: 'update'
    },
    {
      id: 2,
      action: 'Added new product listing',
      date: '2024-03-14 09:15',
      type: 'add'
    },
    {
      id: 3,
      action: 'Processed order #12345',
      date: '2024-03-13 16:45',
      type: 'process'
    },
    {
      id: 4,
      action: 'Updated pricing strategy',
      date: '2024-03-12 11:20',
      type: 'update'
    },
  ]);

  // Fetch user profile data from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          // User profile exists, load it
          setUserData(userDoc.data());
        } else {
          // Create a new user profile with default values
          const defaultUserData = {
            name: currentUser.displayName || '',
            email: currentUser.email || '',
            phone: '',
            role: 'User',
            company: '',
            location: '',
            bio: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          await setDoc(userDocRef, defaultUserData);
          setUserData(defaultUserData);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setSaveMessage({
          type: 'error',
          text: 'Failed to load profile data. Please refresh the page.'
        });
      }
    };
    
    fetchUserProfile();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous save messages when user makes changes
    setSaveMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    const errors = [];
    
    if (!userData.name.trim()) {
      errors.push('Name is required');
    }
    
    if (!userData.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!userData.phone.trim()) {
      errors.push('Phone number is required');
    }
    
    if (!userData.company.trim()) {
      errors.push('Company name is required');
    }
    
    if (!userData.location.trim()) {
      errors.push('Location is required');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setSaveMessage({
        type: 'error',
        text: 'You must be logged in to update your profile.'
      });
      return;
    }
    
    const errors = validateForm();
    if (errors.length > 0) {
      setSaveMessage({
        type: 'error',
        text: errors.join(', ')
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Update user profile in Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const updatedData = {
        ...userData,
        updatedAt: new Date().toISOString()
      };
      
      await updateDoc(userDocRef, updatedData);
      
      // Add new activity
      const newActivity = {
        id: Date.now(),
        action: 'Updated profile information',
        date: new Date().toLocaleString(),
        type: 'update'
      };
      
      setActivityHistory(prev => [newActivity, ...prev]);
      
      setSaveMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage({
        type: 'error',
        text: 'Failed to save changes. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reload the saved data from Firestore
    const fetchUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    fetchUserProfile();
    setIsEditing(false);
    setSaveMessage({ type: '', text: '' });
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    
    setIsDeleting(true);
    try {
      await deleteAccount();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setSaveMessage({
        type: 'error',
        text: 'Failed to delete account. Please try again.'
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSubscriptionClick = () => {
    if (userRole === 'farmer') {
      navigate('/farmer-subscription');
    } else {
      navigate('/subscription');
    }
  };

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-content">
          <div className="profile-section">
            <p>Please log in to view and edit your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="action-buttons">
            <button 
              className="save-button" 
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              className="cancel-button" 
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {saveMessage.text && (
        <div className={`message ${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={userData.company}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="4"
              />
            </div>
          </form>
        </div>

        <div className="profile-section">
          <h2>Subscription</h2>
          <div className="subscription-info">
            <div className="subscription-details">
              <h3>Manage Your Subscription</h3>
              <p>View and manage your subscription plan details</p>
            </div>
            <button 
              className="subscription-button"
              onClick={handleSubscriptionClick}
            >
              {userRole === 'farmer' ? 'Farmer Subscription' : 'Consumer Subscription'}
            </button>
          </div>
        </div>

        <div className="profile-section">
          <h2>Activity History</h2>
          <div className="activity-list">
            {activityHistory.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">
                  {activity.type === 'update' && '🔄'}
                  {activity.type === 'add' && '➕'}
                  {activity.type === 'process' && '✅'}
                </div>
                <div className="activity-details">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-date">{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section danger-zone">
          <h2>Account Settings</h2>
          <div className="account-settings">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all associated data</p>
              </div>
              <button 
                className="delete-account-button"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="delete-confirm-buttons">
              <button 
                className="cancel-delete-button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 