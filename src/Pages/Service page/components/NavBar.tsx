import * as React from "react";
import { Box, IconButton } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import ColorSchemeToggle from "./ColorSchemeToggle.tsx";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { Link } from "react-router-dom";
import IconButtonMenu from "../../../Components/IconButtonMenu.jsx";

export default function HeaderSection({ email, name }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: "background.body",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton size="sm" variant="soft">
          <Link to="/home">
            <LocalParkingIcon />
          </Link>
        </IconButton>
        <Typography component="h1" fontWeight="xl">
          EasyPark
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: "center",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <IconButtonMenu />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">{name}</Typography>
            <Typography level="body-xs">{email}</Typography>
          </Box>
        </Box>
        <ColorSchemeToggle sx={{ alignSelf: "center" }} />
      </Box>
    </Box>
  );
}
