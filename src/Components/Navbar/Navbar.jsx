import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedin, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/home");
  };

  return (
    <nav>
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
          <IconButton size="small" variant="soft">
            <Link to="/home">
              <LocalParkingIcon />
            </Link>
          </IconButton>
          <Typography
            color="white"
            component="h1"
            fontWeight="xl"
            className="logo"
          >
            EasyPark
          </Typography>
        </Box>

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          {isLoggedin ? (
            <li>
              <NavLink to="/home" onClick={handleSignOut}>
                Sign Out
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login">Log in</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign up</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </Box>
    </nav>
  );
}

export default Navbar;
