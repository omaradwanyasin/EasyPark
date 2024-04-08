import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggleButton({ value, handleToggleChange }) {
  //I've removed the local state alignment since it's not necessary.

  // The handleChange function now calls the handleToggleChange prop passed from the parent component, passing the event and the new value.
  
  const handleColorChange = (event, newValue) => { 
    handleToggleChange(event, newValue);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleColorChange}
      aria-label="Platform"
    >
      <ToggleButton value="on" color="success">
        Available
      </ToggleButton>
      <ToggleButton color="error" value="of">
        Closed
      </ToggleButton>
      <ToggleButton value="full">Full</ToggleButton>
    </ToggleButtonGroup>
  );
}
