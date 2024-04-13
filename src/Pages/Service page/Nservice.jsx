import React, { useState, useEffect, useRef, useCallback } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import "mapbox-gl/dist/mapbox-gl-csp";
import Map from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import MapMarker from "../../Components/MapMarker.jsx";
import NavBar from "./components/NavBar.tsx";
import RentalCard from "./components/RentalCard.tsx";
import HeaderSection from "./components/HeaderSection.tsx";
import park from "./park.json";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"; // Modified import

export default function RentalDashboard() {
  const mapRef = useRef(null);

  const directionsRef = useRef(null);
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    console.log(selectedPark?.geometry.coordinates);
  }, [selectedPark]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      directionsRef.current = new MapboxDirections({
        accessToken:
          "pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw",
        unit: "metric",
        profile: "mapbox/driving",
        controls: { instructions: true },
      });
      map.addControl(directionsRef.current, "top-left");
      //this i will edit it later here should be the user location
      directionsRef.current.setOrigin([35.29817997108734, 32.46248446267177]);
    }
  }, [mapRef.current]);
  useEffect(() => {
    return () => {
      if (directionsRef.current) {
        const map = mapRef.current.getMap();
        map.removeControl(directionsRef.current);
        directionsRef.current = null;
      }
    };
  }, []);

  const handlePopupClick = useCallback((parking) => {
    const coordinates = parking.geometry.coordinates;
    if (directionsRef.current) {
      // If origin (point A) is already set, set the destination (point B)
      directionsRef.current.setDestination([coordinates[0], coordinates[1]]);
    }
  }, []);

  const handleMapTransition = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 1000,
      zoom: 17,
    });
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: { xs: "auto", md: "50% 50%" },
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "background.surface",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            overflow: "auto",
          }}
        >
          <HeaderSection />
          {park.features.map((parking) => (
            <RentalCard
              key={parking.id}
              title={parking.name}
              text={parking.info}
              status={parking.status}
              price={parking.price}
              rating={parking.rating}
              onSelectCity={() =>
                handleMapTransition({
                  latitude: parking.geometry.coordinates[1],
                  longitude: parking.geometry.coordinates[0],
                })
              }
              onPopupClick={() => handlePopupClick(parking)}
            />
          ))}
        </Stack>
        <Box
          sx={{
            gridRow: "span 3",
            display: { xs: "none", md: "flex" },
            backgroundColor: "",
          }}
        >
          <div style={{ width: "50vw" }}>
            <Map
              ref={mapRef}
              mapboxAccessToken="pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw"
              style={{
                overflow: "hidden",
                width: "100%",
                height: "100vh",
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
                  onClick={() => handlePopupClick(selectedPark)}
                >
                  <h3 style={{ color: "black" }}>Im Here!</h3>
                </Popup>
              )}
            </Map>
          </div>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
