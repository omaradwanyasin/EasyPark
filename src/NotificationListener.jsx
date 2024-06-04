import React, { useEffect, useContext, useState } from "react";
import { SignalRContext } from "./signalRService";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const NotificationListener = () => {
  const connection = useContext(SignalRContext);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // default severity
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveNotification", (message, severity) => {
        setAlertMessage(message);
        setSeverity(severity === "error" ? "error" : "success");
        setOpen(true);
      });

      return () => {
        connection.off("ReceiveNotification");
      };
    }
  }, [connection]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default NotificationListener;
