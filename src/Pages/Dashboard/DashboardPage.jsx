import React, { useState, useEffect } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [capacity, setCapacity] = useState(null); // Track capacity
  const [reservations, setReservations] = useState([]); // Track reservations
  const garageOwnerId = localStorage.getItem("userId");
  const garageid = localStorage.getItem("garageid");

  const fetchParkingData = async () => {
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

      setCapacity(data.capacity); // Update capacity from fetched data
    } catch (error) {
      console.error("Error fetching parking data:", error);
      // Handle error gracefully, maybe show a message to the user
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `https://easypark.azurewebsites.net/api/Reservation/reservation?garageId=${garageid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservation data");
      }
      const data = await response.json();

      // Extract necessary information from data
      const formattedReservations = data.map((reservation) => {
        return {
          reservation_id: reservation.id,
          name: reservation.name,
          phone_number: reservation.phone,
          userId: reservation.userId, // Make sure you have userId in your reservation data
        };
      });
      setReservations(formattedReservations); // Update reservations from formatted data
    } catch (error) {
      console.error("Error fetching reservation data:", error);
      // Handle error gracefully, maybe show a message to the user
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchParkingData();
      fetchReservations(); // Fetch reservations when user is logged in

      // Set interval to fetch reservations every 3 seconds
      const intervalId = setInterval(fetchReservations, 3000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]); // Run when isLoggedIn changes

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (userEmail && userName && userId) {
      setUserInfo({ email: userEmail, name: userName, id: userId });
      setIsLoggedIn(true); // Set isLoggedIn to true when user info is available
    }
  }, []);

  const increase = () => {
    if (counter < capacity) {
      setCounter((prev) => prev + 1);
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
                  userId={reservation.userId} // Pass userId to UserCard
                  increaseCounter={increase}
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
              garageId={garageid} // send the garage ID as a string
            />
            Counter : {counter}
            <div className="buttonaction">
              {toggleValue !== "off" && (
                <Fab color="success" aria-label="add" onClick={increase}>
                  <AddIcon />
                </Fab>
              )}
              {toggleValue !== "off" && (
                <Fab color="error" aria-label="add">
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
