import React, { useEffect } from "react";
import Navgation from "../../Components/Navbar/Navgation";
import firstmap from "../../Images/Map.png";
import "../Home page/Home.css";
import Button from "@mui/material/Button";
import Aos from "aos";
import "aos/dist/aos.css";
import BioCard from "../../Components/BioCard";

function Home() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="Head-section">
        <div className="text-service-section" data-aos="fade-down">
          <h1>EasyPark: Your Instant Parking Solution</h1>
          <p>
            Discover EasyPark: Instantly find parking spots near you with just a
            tap. Say goodbye to parking woes and hello to convenience!
          </p>
          <div>
            <Button>Explore Service</Button>
          </div>
        </div>
        <div data-aos="zoom-in">
          <img style={{ width: "130%" }} src={firstmap} />
        </div>
      </div>
      <div className="seconde-head">
        <h3 data-aos="zoom-in">Revolutionizing Parking in Palestine</h3>
        <p data-aos="zoom-in" style={{ width: "40%", margin: "auto" }}>
          Say goodbye to the frustration of searching for parking spots in
          Palestine. EasyPark is proud to introduce the first-ever parking spot
          finder dedicated to Palestinian cities.
        </p>
        <div className="cards" data-aos="zoom-in">
          <BioCard text={"Instantly locate available parking spots near you"} />
          <BioCard
            text={"Real-time updates on parking availability to save you time"}
          />
          <BioCard text={"User Friendly Interface"} />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Home;
