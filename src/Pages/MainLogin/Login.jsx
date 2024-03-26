import React from "react";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

function Login() {
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="text">Sign up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className="forget-password">
          <span>Forget Password?</span>
        </div>
        <div className="submit_container">
          {/* <div className="submit">Sign up</div> */}
          <div className="submit">Login</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
