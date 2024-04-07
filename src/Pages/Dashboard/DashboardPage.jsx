import React from "react";
import "../Dashboard/DDashboardPage.css";
import ColorToggleButton from "./ColorToggleButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import UserCard from "./UserCard";
import resarvation from "./reservations.json";
function DashboardPage() {
  const [counter, setcounter] = useState(0);

  const increase = () => {
    setcounter((prev) => prev + 1);
  };
  const deacrease = () => {
    setcounter((prev) => prev - 1);
  };
  return (
    <div className="maindiv">
      <div className="headers">
        <h1>EasyPark</h1>
        <h3 style={{ paddingTop: "15px" }}>Welcome, Samer Omar!</h3>
      </div>
      <div className="conts">
        <div className="resv">
          <h3>Reservations</h3>
          <div>
            {resarvation.users.map((user) => (
              <UserCard
                id={user.reservation_id}
                name={user.name}
                phone={user.phone_number}
                img={user.image_url}
                increaseCounter={increase}
              />
            ))}
          </div>
        </div>
        <div className="cap">
          <h3>Capacity {counter}/50</h3>
          <ColorToggleButton />
          Counter : {counter}
          <div className="buttonaction">
            <Fab color="success" aria-label="add" onClick={increase}>
              <AddIcon />
            </Fab>
            <Fab color="error" aria-label="add" onClick={deacrease}>
              <RemoveIcon />
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;