import React, { createContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext(null);

const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const userId = "666818f0864cb7ece12ac43a"; // Use the actual user ID from localStorage or another auth source
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://easyparkfinal.azurewebsites.net/notificationHub?userId=${userId}`
      )
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
