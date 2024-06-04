import React, { createContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext(null);

const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const userId = "0"; // Replace with actual user ID once available
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7140/notificationHub?userId=${userId}`)
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("SignalR connected");
        setConnection(newConnection);
      })
      .catch((err) => console.error("SignalR Connection Error: ", err));

    return () => {
      newConnection.stop().then(() => console.log("SignalR disconnected"));
    };
  }, []);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};

export { SignalRContext, SignalRProvider };
