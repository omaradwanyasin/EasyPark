import React, { useState } from "react";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import "../MainLogin/Signup.css";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl-csp";
import "../../Components/LoginBtn";
import LoginBtn from "../../Components/LoginBtn";
import { colors } from "@mui/material";
function GarageOwner() {
  const [viewport, setViewport] = useState({
    width: "800px",
    height: "600px",
    // latitude: 32.461,
    // longitude: 35.3,
    // zoom: 14
  });
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    setMarkerPosition({ longitude: lng, latitude: lat });
  };
  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };
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
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="text" placeholder="Phone number" />
        </div>
        <div className="map-head">
          <h1 className="location">Choose Your Location</h1>
          <div className="input" id="map">
            <MapGL
              {...viewport}
              mapboxAccessToken="pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw"
              style={{
                borderRadius: "30px",
                width: "800px",
                height: "400px",
                margin: "auto",
              }}
              initialViewState={{ latitude: 32.461, longitude: 35.3, zoom: 14 }}
              mapStyle={"mapbox://styles/omaradwn/clthk171g009n01qwa8r4en8v"}
              onViewportChange={handleViewportChange}
              onClick={handleMapClick}
            >
              {markerPosition && (
                <Marker
                  longitude={markerPosition.longitude}
                  latitude={markerPosition.latitude}
                  draggable={true}
                  onDragEnd={(event) => {
                    const { lngLat } = event;
                    setMarkerPosition({
                      longitude: lngLat[0],
                      latitude: lngLat[1],
                    });
                  }}
                >
                  <img src={user_icon} alt="Marker" />
                </Marker>
              )}
            </MapGL>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30 }} className="forget-password">
        <span>Forget Password?</span>
      </div>

      <div className="submit_container">
        <LoginBtn name="sign up" />
      </div>
    </div>
  );
}

export default GarageOwner;
