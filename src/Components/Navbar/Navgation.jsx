import React from "react";
import "../Navbar/navStyle.css";
import "../HomePageBtn";
import HomePageBtn from "../HomePageBtn";
import Home from "../../Pages/Home page/Home";
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
        <li> Home</li>
        <li> Contact</li>
      </ul>
    </div>
  );
}

export default Navgation;
