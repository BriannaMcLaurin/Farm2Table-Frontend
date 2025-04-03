import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    company: 'Farm2Table Inc.',
    location: 'New York, NY',
    bio: 'Experienced agricultural technology professional with a passion for sustainable farming.',
  });

  const [activityHistory] = useState([
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically make an API call to update the user data
    console.log('Updated user data:', userData);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
        <button 
          className={`edit-button ${isEditing ? 'cancel' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-avatar">
            <img src="/default-avatar.svg" alt="Profile" />
            {isEditing && (
              <button className="change-avatar">
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
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="4"
              />
            </div>

            {isEditing && (
              <button type="submit" className="save-button">
                Save Changes
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