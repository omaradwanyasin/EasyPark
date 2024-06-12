import React, { useState, useEffect, useRef } from "react";
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
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
export default function RentalDashboard() {
  const mapRef = useRef(null);
  const directionsRef = useRef(null);
  const [selectedPark, setSelectedPark] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [parkings, setParkings] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const isLoggedIn = sessionStorage.getItem("IsLogged");
  useEffect(() => {
    console.log("User name from localStorage:", localStorage.getItem("name"));
    console.log("User id from localStorage:", localStorage.getItem("userId"));
    console.log(
      "User email from localStorage:",
      localStorage.getItem("userEmail")
    );
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    const userId = sessionStorage.getItem("userId");

    setUserInfo({ email: userEmail, name: userName, id: userId });
  }, []);

  useEffect(() => {
    // Fetch data from your API
    fetch("https://localhost:7140/parkings")
      .then((response) => response.json())
      .then((data) => {
        setParkings(data);
      })
      .catch((error) => {
        console.error("Error fetching parking data:", error);
      });
  }, []);
  //for push test
  useEffect(() => {
    // Get user's current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []); // Empty dependency array to run only once when component mounts

  useEffect(() => {
    if (mapRef.current && userLocation && !directionsRef.current) {
      const map = mapRef.current.getMap();
      directionsRef.current = new MapboxDirections({
        accessToken:
          "pk.eyJ1Ijoib21hcmFkd24iLCJhIjoiY2x1MWE0dHE4MGJtZTJqbW5mZ3p0M3BjdyJ9.TgSibF8OzyeO3mgVef1wNw",
        unit: "metric",
        profile: "mapbox/driving",
        controls: { instructions: true },
      });
      map.addControl(directionsRef.current, "top-left");
      // Set user's location as the origin
      directionsRef.current.setOrigin(userLocation);
    }
  }, [mapRef.current, userLocation]); // Dependency array includes userLocation

  useEffect(() => {
    return () => {
      if (directionsRef.current && mapRef.current) {
        // Added null check for mapRef.current
        const map = mapRef.current.getMap();
        map.removeControl(directionsRef.current);
        directionsRef.current = null;
      }
    };
  }, []);

  const handlePopupClick = (parking) => {
    const coordinates = parking.geometry;
    if (directionsRef.current) {
      // If origin (point A) is already set, set the destination (point B)
      directionsRef.current.setDestination([coordinates[0], coordinates[1]]);
    }
  };

  const handleMapTransition = ({ longitude, latitude }) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 1000,
      zoom: 17,
    });
  };

  useEffect(() => {
    // Establish connection to SignalR hub
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7140/garageHubs")
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        console.log("SignalR connection established");

        // Listen for status updates from SignalR hub
        connection.on("ReceiveStatusUpdate", (garageId, status) => {
          console.log(
            `Received status update: Garage ${garageId}, Status ${status}`
          );

          // Update parking status in parkings state
          setParkings((prevParkings) =>
            prevParkings.map((parking) =>
              parking.id === garageId ? { ...parking, status } : parking
            )
          );
        });
      })
      .catch((error) => {
        console.error("Error establishing SignalR connection:", error);
      });

    return () => {
      // Clean up SignalR connection
      connection.stop().then(() => console.log("SignalR connection stopped"));
    };
  }, []);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar email={userInfo.email} name={userInfo.name} />
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
          {parkings.map((parking) => (
            <RentalCard
              key={parking.id}
              id={parking.id}
              title={parking.name}
              text={parking.info}
              status={parking.status}
              price={parking.price}
              rating={parking.rating}
              wifi={parking.containsWifi}
              charging={parking.supportsElectricalCharging}
              heavyCars={parking.supportsHeavyTrucks}
              onSelectCity={() =>
                handleMapTransition({
                  latitude: parking.geometry[0],
                  longitude: parking.geometry[1],
                })
              }
              isLoggedIn={isLoggedIn}
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
              {parkings.map((item) => (
                <Marker
                  key={item.id}
                  latitude={item.geometry[0]}
                  longitude={item.geometry[1]}
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
                  latitude={selectedPark.geometry[0]}
                  longitude={selectedPark.geometry[1]}
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
