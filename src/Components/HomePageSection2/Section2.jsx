import React from "react";
import "./Section2.css";
import img from "./man.png";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button } from "@mui/material";
function Section2() {
  return (
    <div className="main" data-aos="zoom-in">
      <div>
        <h2>The simplest way to book a parking space.</h2>
        <div className="featuers">
          <div className="cont">
            <div>
              <LocationSearchingIcon />
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
              <ElectricBoltIcon />
            </div>
            <div>
              <h3>Book guaranteed parking in seconds</h3>
              <p>
                Scroll through the available spaces and check out reviews &
                photos. Then just tap book and relax – parking has never been
                simpler.
              </p>
            </div>
          </div>
          <div className="cont">
            {" "}
            <div>
              <DoneAllIcon />
            </div>
            <div>
              <h3>You’re all set</h3>
              <p>
                Find directions & access instructions and amend your booking if
                needed - all through your JustPark account. And, if you need
                anything else, our Customer Service team is always there to
                help.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pp">
        <img src={img}></img>
        <button>Find your space</button>
      </div>
    </div>
  );
}

export default Section2;
