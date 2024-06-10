import React, { useState, useEffect } from "react";
import "../Dashboard/DDashboardPage.css";
import ColorToggleButton from "./ColorToggleButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import UserCard from "./UserCard";
import resarvation from "./reservations.json";
import NavBarDash from "./NavDash";
import NotificationsPopup from "./NotificationsPopup";
import { SignalRProvider } from "../../signalRService";

function DashboardPage() {
  const [userInfo, setUserInfo] = useState({});
  const [counter, setCounter] = useState(0);
  const [toggleValue, setToggleValue] = useState("web");
  const [capacity, setCapacity] = useState(50); // Initial capacity
  const [parkingData, setParkingData] = useState(null);

  useEffect(() => {
    fetchParkingData();
  }, []); // Run only once on component mount

  const fetchParkingData = async () => {
    try {
      const userId=sessionStorage.getItem("userId");
      console.log("User id from localStorage:", userId);
      const response = await fetch(`https://localhost:7140/parkings/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch parking data");
      }
      const data = await response.json();
      console.log("Fetched parking data:", data);
      setCapacity(data.capacity); // Update capacity from fetched data
      console.log("Capacity: " + data.capacity);
      setParkingData(data); // Store the entire data if needed later
    } catch (error) {
      console.error("Error fetching parking data:", error);
      // Handle error gracefully, maybe show a message to the user
    }
  };

  useEffect(() => {
    // Your existing useEffect logic
    console.log("User name from localStorage:", localStorage.getItem("name"));
    console.log("User id from localStorage:", localStorage.getItem("userId"));
    console.log("User email from localStorage:", localStorage.getItem("userEmail"));
    const userEmail = sessionStorage.getItem("userEmail");
    const userName = sessionStorage.getItem("userName");
    const userId = sessionStorage.getItem("userId");
    setUserInfo({ email: userEmail, name: userName, id: userId });
  }, []);

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

  const userId = localStorage.getItem("userId");

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
              {resarvation.users.map((user) => (
                <UserCard
                  key={user.reservation_id}
                  id={user.reservation_id}
                  name={user.name}
                  phone={user.phone_number}
                  img={user.image_url}
                  userId={userId}
                  increaseCounter={increase}
                />
              ))}
            </div>
          </div>
          <div className="cap">
            <h3>Capacity {capacity}</h3>
            <ColorToggleButton
              value={toggleValue}
              handleToggleChange={handleToggleChange}
              garageId={localStorage.getItem("userId")} // send the garage ID as a string
            />
            Counter : {counter}
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
            <NotificationsPopup userId={userId} />
          </div>
        </div>
      </div>
    </SignalRProvider>
  );
}

export default DashboardPage;
