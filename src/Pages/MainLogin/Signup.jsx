import React from "react";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import "../MainLogin/Signup.css";
import LoginBtn from "../../Components/LoginBtn";
import Home from "../Home page/Home";
import Navgation from "../../Components/Navbar/Navgation";
import HomePageBtn from "../../Components/HomePageBtn";
import GarageOwner from "./GarageOwner";
import {Link} from "react-router-dom";
function Signup() {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Name" />
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div style={{ marginTop: 30 }} className="forget-password">
        <span>Forget Password?</span>
      </div>
      <div className="submit_container">
        <div ><LoginBtn name="Sign up" /></div>
        <div className="Login-As-GarageOwner" >
          {" "}
          <Link to="/GarageOwner">Login as garage owner</Link>
        </div>

        {/* <div className="submit">Login</div> */}
      </div>
    </div>
  );
}

export default Signup;
