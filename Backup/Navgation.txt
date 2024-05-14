import React from "react";
import "../Navbar/navStyle.css";
import "../HomePageBtn";
import HomePageBtn from "../HomePageBtn";
import Home from "../../Pages/Home page/Home";
import {Link} from "react-router-dom"
function Navgation() {
  return (
    <div className="navbar">
      <h1 className="logo">EasyPark</h1>
      <ul>
        <li>
          <HomePageBtn name="Log in " destination="/login"/>
        </li>
        <li>
          <HomePageBtn name="Sign up" destination="/signup"/>
        </li>
        <li> <Link to="/home">Home</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
      </ul>
    </div>
  );
}

export default Navgation;
