import React, { useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl-csp";
import user_icon from "./Assets/person.png";


function SignMap() {
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
        console.log("Latitude", lat, "Longitude", lng)
        setMarkerPosition({ longitude: lng, latitude: lat });
      };
      const handleViewportChange = (newViewport) => {
        setViewport(newViewport);
      };
  return (
   <>
   <MapGL
              {...viewport}
              mapboxAccessToken="pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw"
              style={{
                borderRadius: "30px",
                width: "400px",
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
            </>
  )
}

export default SignMap