import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl-csp";
import Map from "react-map-gl";
import "../../Pages/Service page/Service.css";
import Navgation from "../../Components/Navbar/Navgation";
import { useNavigate } from "react-router-dom";
import { Marker } from "react-map-gl";
import park from "./park.json";
import MapMarker from "../../Components/MapMarker";
import BioCard from "../../Components/BioCard";
import BottomActionsCard from "../../Components/BottomActionsCard";

function Service() {
  const [selectedPark, setSelectedPark] = useState(null);
  //this i scomment for samer samatre 202011257 61283478193784 32jk4h32kjwewbfkja scknasd vckj sdjkasdbj
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
          >
            {park.features.map((item) => (
              <Marker
                latitude={item.geometry.coordinates[1]}
                longitude={item.geometry.coordinates[0]}
              >
                <button
                  style={{ all: "unset", cursor: "pointer" }}
                  onClick={(e) => {
                    console.log("clicked");
                    e.preventDefault();
                    setSelectedPark(item);
                  }}
                >
                  <MapMarker />
                </button>
              </Marker>
            ))}
          </Map>
        </div>

        <div className="parking-display">
          {park.features.map((parkings) => (
            <BottomActionsCard
              title={parkings.name}
              text={parkings.info}
              status={parkings.status}
              rating={parkings.rating}
            />
          ))}
        </div>
      </div>

      <br />
    </div>
  );
}

export default Service;
