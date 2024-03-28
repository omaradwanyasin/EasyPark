import React from "react";
import "mapbox-gl/dist/mapbox-gl-csp";
import Map from "react-map-gl";
import "../../Pages/Service page/Service.css";
import Navgation from "../../Components/Navbar/Navgation";

function Service() {
  return (
    <div>
      <Navgation />
      <div
        className="service-div"
        style={{ borderRadius: "30px", overflow: "hidden" }}
      >
        <div style={{ width: "80vw", margin: "auto" }}>
          <Map
            mapboxAccessToken="pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw"
            style={{
              overflow: "hidden",
              borderRadius: "30px",
              width: "80vw",
              height: "80vh",
              margin: "auto",
            }}
            initialViewState={{
              latitude: 32.461,
              longitude: 35.3,
              zoom: 14,
              // Add the zoom level here if you want to initialize the map with a specific zoom
            }}
            mapStyle={"mapbox://styles/omaradwn/clthk171g009n01qwa8r4en8v"}
          />
        </div>
      </div>
      <br />
    </div>
  );
}

export default Service;
