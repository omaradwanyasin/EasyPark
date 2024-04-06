import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
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
