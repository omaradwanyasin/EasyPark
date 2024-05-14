import "../../Pages/Service page/Service.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl-csp";
import Map from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import park from "./park.json";
import MapMarker from "../../Components/MapMarker";
import BottomActionsCard from "../../Components/BottomActionsCard";
import KeepMountedModal from "../../Components/KeepMountedModal";
import Navbar from "../../Components/Navbar/Navbar";
const ItemsPerPage = 3;
function Service() {
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
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="service-div" style={{ overflow: "hidden" }}>
        
        <div style={{ width: "70vw" }}>
          <Map
            ref={mapRef}
            mapboxAccessToken="pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw"
            style={{
              overflow: "hidden",
              borderRadius: "30px",
              width: "100%",
              height: "90vh",
              float: "right",
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
        <div className="parking-display">
          {park.features.slice(startIndex, endIndex).map((parking) => (
            <BottomActionsCard
              key={parking.id}
              title={parking.name}
              text={parking.info}
              status={parking.status}
              onSelectCity={() =>
                handleMapTransition({
                  latitude: parking.geometry.coordinates[1],
                  longitude: parking.geometry.coordinates[0],
                })
              }
            />
          ))}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= park.features.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Service;
