import React from "react";
import "./Section2.css";
import img from "./man.png";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";
function Section2() {
  return (
    <div className="main" data-aos="zoom-in">
      <div>
        <h2>The simplest way to book a parking space.</h2>
        <div className="featuers">
          <div className="cont">
            <div>
              <SearchIcon />
            </div>
            <div>
              <h3>Tell us where you’re going</h3>
              <p>
                Our super smart app will quickly find the best space for you.
                And with 100k spaces to choose from, including private
                driveways, no one gets you closer.
              </p>
            </div>
          </div>
          <div className="cont">
            {" "}
            <div>
              <DirectionsCarIcon />
            </div>
            <div>
              <h3>Tell us where you’re going</h3>
              <p>
                Our super smart app will quickly find the best space for you.
                And with 100k spaces to choose from, including private
                driveways, no one gets you closer.
              </p>
            </div>
          </div>
          <div className="cont">
            {" "}
            <div>
              <CheckCircleOutlineIcon />
            </div>
            <div>
              <h3>Tell us where you’re going</h3>
              <p>
                Our super smart app will quickly find the best space for you.
                And with 100k spaces to choose from, including private
                driveways, no one gets you closer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={img}></img>
        <button>Find your space</button>
      </div>
    </div>
  );
}

export default Section2;
