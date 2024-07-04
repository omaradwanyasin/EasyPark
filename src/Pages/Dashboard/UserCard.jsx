import React from "react";
import axios from "axios";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import "./DDashboardPage.css";
import { useSignalR } from "../../signalRService";

export default function UserCard(props) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isAccepted, setIsAccepted] = React.useState(false);
  const connection = useSignalR(); // Access connection from context

  const handleReject = async () => {
    try {
      const response = await axios.delete(
        `https://easyparkfinal.azurewebsites.net/api/Reservation/deleteReservation?reservationid=${props.id}`
      );
      if (response.status !== 200) {
        throw new Error(
          `Failed to delete reservation. Status code: ${response.status}`
        );
      }
      setIsVisible(false);
      props.onReject(props.id); // Notify parent component about the rejection
      const message = "Your reservation has been rejected.";
      await connection.invoke(
        "SendNotification",
        message,
        "error",
        props.userId
      );
      console.log(`Rejected reservation for user ${props.userId}`);
    } catch (error) {
      console.error(
        "Error deleting reservation:",
        error.response ? error.response.data : error.message
      );
      // Handle error gracefully, maybe show a message to the user
    }
  };

  const handleAccept = async () => {
    if (!isAccepted) {
      props.increaseCounter(); // Increase counter on accept
      const message = "Your reservation has been accepted.";
      await connection.invoke(
        "SendNotification",
        message,
        "success",
        props.userId
      );
      console.log(`Accepted reservation for user ${props.userId}`);
      setIsAccepted(true);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      {isVisible && (
        <Card
          className="Information"
          orientation="horizontal"
          sx={{
            width: "90%",
            flexWrap: "wrap",
            ["& > *"]: {
              "--stack-point": "500px",
              minWidth:
                "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
            },
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              Name: {props.name}
            </Typography>

            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
                p: 1.5,
                my: 1.5,
                display: "flex",
                gap: 2,
                "& > div": { flex: 1 },
              }}
            >
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Phone number
                </Typography>
                <Typography fontWeight="lg">{props.phone}</Typography>
              </div>
              <div></div>
            </Sheet>
            <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
              <Button variant="outlined" color="neutral" onClick={handleReject}>
                Reject
              </Button>
              <Button variant="solid" color="primary" onClick={handleAccept}>
                Accept
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
