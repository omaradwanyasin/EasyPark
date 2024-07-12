import React, { createContext, useState, useEffect, useContext } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext(null);

const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    console.log("Attempting to connect to SignalR with userId:", userId);

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `https://easypark.azurewebsites.net/notificationHub?userId=${userId}`
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

    newConnection.onclose((err) => {
      console.error("SignalR connection closed:", err);
    });

    return () => {
      if (newConnection) {
        newConnection.stop().then(() => {
          console.log("SignalR disconnected");
        });
      }
    };
  }, []);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};

const useSignalR = () => useContext(SignalRContext);

export { SignalRContext, SignalRProvider, useSignalR };
