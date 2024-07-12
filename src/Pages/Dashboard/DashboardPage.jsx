import React, { useState, useEffect, useCallback } from "react";
import "../Dashboard/DDashboardPage.css";
import ColorToggleButton from "./ColorToggleButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import UserCard from "./UserCard";
import NavBarDash from "./NavDash";
import NotificationsPopup from "./NotificationsPopup";
import { SignalRProvider } from "../../signalRService";

function DashboardPage() {
  const [userInfo, setUserInfo] = useState({});
  const [counter, setCounter] = useState(0);
  const [toggleValue, setToggleValue] = useState("web");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [capacity, setCapacity] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false); // Track initial load state

  const fetchParkingData = async () => {
    const garageOwnerId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `https://easypark.azurewebsites.net/GarageOwnerGarageData?GarageOwnerId=${garageOwnerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch parking data");
      }
      const data = await response.json();

      localStorage.setItem("garageid", data.id);
      localStorage.setItem("capacity", data.capacity);

      setCapacity(data.capacity);
    } catch (error) {
      console.error("Error fetching parking data:", error);
    }
  };

  const fetchReservations = useCallback(async () => {
    const garageid = localStorage.getItem("garageid");
    try {
      const response = await fetch(
        `https://easypark.azurewebsites.net/api/Reservation/reservation?garageId=${garageid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservation data");
      }
      const data = await response.json();

      const formattedReservations = data.map((reservation) => {
        return {
          reservation_id: reservation.id,
          name: reservation.name,
          phone_number: reservation.phone,
          userId: reservation.userId,
        };
      });
      setReservations(formattedReservations);

      // Set initial load complete after fetching reservations
      setInitialLoadComplete(true);
    } catch (error) {
      console.error("Error fetching reservation data:", error);
    }
  }, []);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    if (userEmail && userName && userId) {
      setUserInfo({ email: userEmail, name: userName, id: userId });
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchParkingData();
      fetchReservations();

      const intervalId = setInterval(fetchReservations, 3000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn, fetchReservations]);

  const increase = () => {
    if (counter < capacity) {
      setCounter((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    }
  };

  const handleToggleChange = (event, newValue) => {
    setToggleValue(newValue);
  };

  const handleReject = (reservationId) => {
    setReservations((prevReservations) =>
      prevReservations.filter(
        (reservation) => reservation.reservation_id !== reservationId
      )
    );
  };

  // Render loading state until initial load is complete
  if (!initialLoadComplete) {
    return <div>Loading...</div>;
  }

  return (
    <SignalRProvider>
      <div className="maindiv">
        <div className="headers">
          <NavBarDash email={userInfo.email} name={userInfo.name} />
        </div>
        <div className="conts">
          <div className="resv">
            <h3>Reservations</h3>
            <div className="resvdisplay">
              {reservations.map((reservation) => (
                <UserCard
                  key={reservation.reservation_id}
                  id={reservation.reservation_id}
                  name={reservation.name}
                  phone={reservation.phone_number}
                  userId={reservation.userId}
                  increaseCounter={increase}
                  decreaseCounter={decrease}
                  onReject={handleReject}
                />
              ))}
            </div>
          </div>
          <div className="cap">
            <h3>Capacity {capacity}</h3>
            <ColorToggleButton
              value={toggleValue}
              handleToggleChange={handleToggleChange}
              garageId={localStorage.getItem("garageid")}
            />
            Counter: {counter}
            <div className="buttonaction">
              {toggleValue !== "off" && (
                <Fab color="success" aria-label="add" onClick={increase}>
                  <AddIcon />
                </Fab>
              )}
              {toggleValue !== "off" && (
                <Fab color="error" aria-label="add" onClick={decrease}>
                  <RemoveIcon />
                </Fab>
              )}
            </div>
          </div>
          <div className="notifications">
            <NotificationsPopup userId={userInfo.id} />
          </div>
        </div>
      </div>
    </SignalRProvider>
  );
}

export default DashboardPage;
