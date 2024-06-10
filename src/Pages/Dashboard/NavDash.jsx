import * as React from "react";
import { Box, IconButton } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";

import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { Link } from "react-router-dom";
export default function NavBarDash({email,name}) {
  const [variant, setVariant] = React.useState("solid");
  const navigate = useNavigate();
 

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");

    // Navigate to the home page
    navigate("/home");
  };
  
  
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
        backgroundColor: "white",

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
        <Typography color="black" component="h1" fontWeight="xl">
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
        
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">{name}</Typography>
            <Typography level="body-xs">{email}</Typography>
          </Box>
        </Box> 
        <Link to ="/Contact">
        <Button size="md" variant={variant} color="neutral">
          Contact Us
        </Button>
        
        </Link>
        <Button size="md" variant={variant} color="neutral" onClick={handleLogout}>
         Log out 
        </Button>
      </Box>
    </Box>
  );
}
