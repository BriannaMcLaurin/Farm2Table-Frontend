import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/Firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
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
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
        <button 
          className={`edit-button ${isEditing ? 'cancel' : ''}`}
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          disabled={isSaving}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {saveMessage.text && (
        <div className={`save-message ${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-avatar">
            <img src={currentUser.photoURL || "/default-avatar.svg"} alt="Profile" />
            {isEditing && (
              <button className="change-avatar" disabled={isSaving}>
                Change Photo
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={userData.role}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={userData.company}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                required
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                rows="4"
              />
            </div>

            {isEditing && (
              <button 
                type="submit" 
                className="save-button"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </form>
        </div>

        <div className="activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {activityHistory.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'update' && '🔄'}
                  {activity.type === 'add' && '➕'}
                  {activity.type === 'process' && '✅'}
                </div>
                <div className="activity-details">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-date">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 