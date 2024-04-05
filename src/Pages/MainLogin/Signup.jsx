import React from "react";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import "../MainLogin/Signup.css";
import LoginBtn from "../../Components/LoginBtn";
import {useFormik} from "formik"
import {Link} from "react-router-dom";
function Signup() {
  const validate = (values) => {
    const errors = {};
    if (!values.name){
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (values.email.length < 4) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Weak password";
    } else if (values.password === "12345678") {
      errors.password = "Weak password";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
    },
    validate: validate,
    onSubmit: (values) => {
      const errors = validate(values);
      if (Object.keys(errors).length === 0) {
        alert("Submitting the form...");
        // Here you can perform further actions like making an API call
      } else {
        formik.setErrors(errors); // Update Formik's errors object
      }
    },
  });




  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
    <div className="container">
      <div className="header">
        <div className="text">Sign up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input 
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text" 
          placeholder="Name"
          id="name"
          name="name" />
          {formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="input">
              <img src={email_icon} alt="" />
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Email"
                id="email"
                name="email"
              />
              {formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
              {formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
      </div>
      <div style={{ marginTop: 30 }} className="forget-password">
        <span>Forget Password?</span>
      </div>
      <div className="submit_container">
        <div ><LoginBtn name="Sign up" onClick={formik.handleSubmit}  />
        </div>
        <div className="Login-As-GarageOwner"  >
          {" "}
          <Link to="/GarageOwner">Login as garage owner</Link>
        </div>

        {/* <div className="submit">Login</div> */}
      </div>
    </div>
    </form>
    </div>
  );
}

export default Signup;