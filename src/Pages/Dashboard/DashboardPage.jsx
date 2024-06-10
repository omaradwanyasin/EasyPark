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
  const garageId = sessionStorage.getItem("garageId"); // garage id should be stored
  const capacity = 50; // i will update it to be more dynamic later
  useEffect(() => {
    console.log(
      "User name from localStorage:",
      sessionStorage.getItem("userName")
    );
    console.log("User id from localStorage:", sessionStorage.getItem("userId"));
    console.log(
      "User email from localStorage:",
      sessionStorage.getItem("userEmail")
    );
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

  const userId = localStorage.getItem("userId"); // should be from local storge

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
              garageId={garageId} // send the garage ID as a string
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
