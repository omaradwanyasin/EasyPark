import React, { useState } from "react";
import { Box, IconButton } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo/EasyPark.png"; // The path should be relative to the current file


function Navbar(){
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
         <IconButton size="sm" variant="soft">
          <Link to="/home">
            <LocalParkingIcon />
          </Link>
        </IconButton>
        <Typography className="logo" >
              EasyPark
        </Typography>
  
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;