import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationBell.css";

function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Simulated API call for user-specific notifications
    axios.get(`http://localhost:8080/notifications/${userId}`)
      .then(res => {
        setNotifications(res.data);
        setHasNew(res.data.length > 0);
      })
      .catch(() => {
        // fallback
        setNotifications([
          { id: '1', message: 'Order #12406 has shipped.' },
          { id: '2', message: 'Welcome to Farm2Table!' }
        ]);
        setHasNew(true);
      });
  }, [userId]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setHasNew(false);
  };

  return (
    <div className="notif-wrapper">
      <div className="notif-icon" onClick={toggleDropdown}>
        <img src="https://img.icons8.com/ios-filled/50/737373/bell.png" alt="Notification" />
        {hasNew && <span className="notif-dot" />}
      </div>
      {showDropdown && (
        <div className="notif-dropdown">
          {notifications.map(n => (
            <p key={n.id}>{n.message}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
