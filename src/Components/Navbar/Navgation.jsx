import React from "react";
import "../Navbar/navStyle.css";
function Navgation() {
  return (
    <div className="navbar">
      <h1 className="logo">EasyPark</h1>
      <ul>
        <li>
          <button>Login</button>
        </li>
        <li>
          <button>Sign in</button>
        </li>
        <li> Home</li>
        <li> Contact</li>
      </ul>
    </div>
  );
}

export default Navgation;
