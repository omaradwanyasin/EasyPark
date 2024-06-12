import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  


  
  useEffect(() => {
    // Check session storage for authentication status
    const loggedIn = sessionStorage.getItem("IsLogged") === "true"; // Change "false" to "true"
    setIsAuthenticated(loggedIn); // Set the authentication status
  }, []);
  // const handleSignOut = () => {
  //   sessionStorage.removeItem("IsLogged");
  //   setIsAuthenticated(true);
  // };
  const handleSignOut = () => {
    setIsAuthenticated('false');
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("IsLogged");

    // Navigate to the home page
    navigate("/home");
  };
  return (
    <nav>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '97%',
          top: 0,
          px: 1.5,
          py: 1,
          zIndex: 10000,
          backgroundColor: '#00041a',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <IconButton size="sm" variant="soft">
            <Link to="/home">
              <LocalParkingIcon />
            </Link>
          </IconButton>
          <Typography color="white" component="h1" fontWeight="xl" className="logo">
            EasyPark
          </Typography>
        </Box>

        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          {isAuthenticated === false ? (
            <>
              <li>
              <NavLink to="/home" onClick={handleSignOut}>Sign Out</NavLink>
              </li>
            </>
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
