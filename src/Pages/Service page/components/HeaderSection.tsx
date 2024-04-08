import * as React from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function HeaderSection() {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography level="h2">Find the Best Parking!!</Typography>
      </Stack>
      <Typography level="body-md" color="neutral">
        List of avilable parkings in jenin
      </Typography>
    </Stack>
  );
}
