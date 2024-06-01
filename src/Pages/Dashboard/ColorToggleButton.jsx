import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export default function ColorToggleButton({
  value,
  handleToggleChange,
  garageId,
}) {
  const [conn, setConnection] = React.useState(null);

  const initSignalRConnection = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7140/garageHubs") // Ensure this URL matches your backend endpoint
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveStatusUpdate", (updatedGarageId, status) => {
        console.log(
          `Garage ${updatedGarageId} status update received: ${status}`
        );
        // Handle the status update if needed
        // You might want to update the state or display a notification
      });

      await connection.start();
      console.log("SignalR connection established");

      setConnection(connection);
    } catch (e) {
      console.error("Error establishing SignalR connection:", e);
    }
  };

  React.useEffect(() => {
    initSignalRConnection();

    return () => {
      if (conn) {
        conn.stop().then(() => console.log("SignalR connection stopped"));
      }
    };
  }, []);

  const handleColorChange = async (event, newValue) => {
    handleToggleChange(event, newValue);

    if (conn && newValue !== null) {
      try {
        let status = 0; // Default status value

        switch (newValue) {
          case "on":
            status = 1; // Available
            break;
          case "off":
            status = 0; // Closed
            break;
          case "full":
            status = 2; // Full
            break;
          default:
            console.warn("Unknown status value:", newValue);
            return; // Exit if the value is unknown
        }

        console.log("Sending update to backend:", garageId, status);
        await conn.invoke("UpdateStatus", garageId, status);
        console.log(
          `Sent update status to server: ${status} for garage ${garageId}`
        );
      } catch (e) {
        console.error("Error sending update to backend:", e);
      }
    } else {
      console.warn(
        "SignalR connection not established or garageId is null/undefined."
      );
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleColorChange}
      aria-label="Platform"
    >
      <ToggleButton value="on" color="success">
        Available
      </ToggleButton>
      <ToggleButton color="error" value="off">
        Closed
      </ToggleButton>
      <ToggleButton value="full">Full</ToggleButton>
    </ToggleButtonGroup>
  );
}
