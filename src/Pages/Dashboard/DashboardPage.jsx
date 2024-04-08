import React from "react";
import "../Dashboard/DDashboardPage.css";
import ColorToggleButton from "./ColorToggleButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import UserCard from "./UserCard";
import resarvation from "./reservations.json";
import Typography from "@mui/joy/Typography";

function DashboardPage() {
  const [counter, setcounter] = useState(0);
  const[togglevalue,setTogleValue]= React.useState("web");
  const capcity=50; // i will update it to be more dinamic later 
  const increase = () => {
    if(counter <capcity){ // limt of the increment
    setcounter((prev) => prev + 1);}
  };
  const deacrease = () => {
    if(counter > 0){ // limt of the decrement
    setcounter((prev) => prev - 1);}
  };
  const handleToggleChange =(event , newValue) => {
    setTogleValue(newValue)
  }
  return (
    <div className="maindiv">
      <div className="headers">
        <h1>EasyPark</h1>
        <h3 style={{ paddingTop: "15px" }}>
          <Typography component="h2">welcome Samer Omar!</Typography>
        </h3>
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
          <ColorToggleButton   value={togglevalue} handleToggleChange={handleToggleChange}  />
          Counter : {counter}
          <div className="buttonaction">
            {togglevalue !== "of"  && (
            <Fab color="success" aria-label="add" onClick={increase}>
              <AddIcon />
            </Fab>)}
            {togglevalue !== "of" && (
            <Fab color="error" aria-label="add" onClick={deacrease}>
              <RemoveIcon />
            </Fab>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
