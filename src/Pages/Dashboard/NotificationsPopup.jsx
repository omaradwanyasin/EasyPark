import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function NotificationsPopup({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://easypark.azurewebsites.net/api/notifications/${userId}`
        );
        const unreadNotifications = response.data.filter(
          (notification) => notification.status === "unread"
        );
        setNotifications(unreadNotifications);
        if (unreadNotifications.length > 0) {
          setOpen(true);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
}
