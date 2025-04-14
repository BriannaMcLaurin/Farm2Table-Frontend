import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";

function Notifications({ userId = "sam123" }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/notifications/${userId}`)
      .then(res => setNotifications(res.data))
      .catch(() => {
        setNotifications([
          { id: "1", message: "Order #12406 has been confirmed." },
          { id: "2", message: "Shipment for Order #12406 has been delivered." }
        ]);
      });
  }, [userId]);

  return (
    <div className="notifications-container">
      <div className="notifications-card">
        <h2>Notifications</h2>
        <div className="notifications-list">
          {notifications.map(n => (
            <p key={n.id}>{n.message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
