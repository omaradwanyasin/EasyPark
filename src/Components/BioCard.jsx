import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

export default function BioCard(props) {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography level="title-lg">EasyPark </Typography>
        <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
          {props.text}
        </Typography>
      </CardContent>
      <CardOverflow sx={{ bgcolor: "background.level1" }}>
        <CardActions buttonFlex="1">
          <ButtonGroup
            variant="outlined"
            sx={{ bgcolor: "background.surface" }}
          >
            <LocalParkingIcon />
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}
