import "../../..//Pages/Service page/Service.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl-csp";
import Map from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import park from "../park.json";
import MapMarker from "../../../Components/MapMarker";
import BottomActionsCard from "../../../Components/BottomActionsCard";
import KeepMountedModal from "../../../Components/KeepMountedModal";
const ItemsPerPage = 3;
function Mapdisplay(props) {
  const mapRef = useRef(null);
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    console.log(selectedPark?.geometry.coordinates);
  }, [selectedPark]);

  const handleMapTransition = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 1000,
      zoom: 17,
    });
  }, []);

  return (
    <div>
      <div className="service-div" style={{ overflow: "hidden" }}>
        <div style={{ width: "50vw" }}>
          <Map
            ref={mapRef}
            mapboxAccessToken="pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw"
            style={{
              overflow: "hidden",
              borderRadius: "30px",
              width: "100%",
              height: "90vh",
            }}
            initialViewState={{ latitude: 32.461, longitude: 35.3, zoom: 14 }}
            mapStyle={"mapbox://styles/omaradwn/clthk171g009n01qwa8r4en8v"}
          >
            {park.features.map((item) => (
              <Marker
                key={item.id}
                latitude={item.geometry.coordinates[1]}
                longitude={item.geometry.coordinates[0]}
              >
                <button
                  style={{ all: "unset", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPark(selectedPark === item ? null : item);
                  }}
                >
                  <MapMarker />
                </button>
              </Marker>
            ))}
            {selectedPark && (
              <Popup
                latitude={selectedPark.geometry.coordinates[1]}
                longitude={selectedPark.geometry.coordinates[0]}
                closeButton={true}
                closeOnClick={false}
              >
                <KeepMountedModal parking={selectedPark} />
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}

export default Mapdisplay;
