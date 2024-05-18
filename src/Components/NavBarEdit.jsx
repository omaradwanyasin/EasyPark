import * as React from "react";
import { Box, IconButton } from "@mui/joy";
import Typography from "@mui/joy/Typography";

import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import Button from "@mui/joy/Button";

import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { Link } from "react-router-dom";
export default function NavBarEdit() {
  const [variant, setVariant] = React.useState("solid");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "97%",
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: "#00041a",

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
        <Typography color="white" component="h1" fontWeight="xl">
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
         <Link to='/login' > <Button size="md" variant={variant} color="primary">
            Login
          </Button>
          </Link>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Link to='/signup'>
            <Button size="md" variant={variant} color="primary">
              Signup
            </Button>
            </Link>
          </Box>
        </Box>
        <Link to='/contact'>
        <Button size="md" variant={variant} color="neutral">
          Contact Us
        </Button>
        </Link>
      </Box>
    </Box>
  );
}
