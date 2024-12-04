import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export default function Approved() {
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        // to make the demo resizable
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Congratulations! You are approved.
        </Typography>
        <Typography variant="body1">
          Thank you for your application. You have been approved for the next steps.
        </Typography>
      </CardContent>
    </Card>
  );
}
