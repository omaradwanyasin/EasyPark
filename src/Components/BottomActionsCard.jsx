import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import TextRating from "./TextRating";
import parkingimg from "../../src/Images/Parkinglot.jpg";

export default function BottomActionsCard(props) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "320px",
        float: "left",
        height: 140,
        // to make the card resizable
        overflow: "auto",
        resize: "horizontal",
        backgroundColor: "#EEEEEE",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Box>
      <CardContent>
        <Typography level="title-lg">{props.title}</Typography>
        <Typography level="body-sm">{props.info}</Typography>
        <Typography level="body-sm">Capacity:50 Car</Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <IconButton variant="outlined" color="neutral" sx={{ mr: "auto" }}>
          <FavoriteBorder />
        </IconButton>
        {props.status === 0 ? (
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => props.onSelectCity()}
          >
            View
          </Button>
        ) : (
          <Button variant="outlined" color="danger">
            Full
          </Button>
        )}
        <Button variant="solid" color="primary">
          Reserve
        </Button>
      </CardActions>
    </Card>
  );
}
