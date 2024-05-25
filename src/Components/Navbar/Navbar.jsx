import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo/EasyPark.png"; // The path should be relative to the current file


function Navbar(){
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/home" className="title">
        {/* Easy <span>Park</span> */}
        <img src={logo} alt="logo" className="logo" />
      </Link>
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