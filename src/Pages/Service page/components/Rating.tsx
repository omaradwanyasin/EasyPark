import React from "react";
import Typography from "@mui/joy/Typography";
import Star from "@mui/icons-material/Star";

export default function Rating(props) {
  const { rating } = props;

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Calculate the remaining fraction for half star or empty star
  const remainder = rating - fullStars;

  // Generate an array of star icons based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      // Full star
      return <Star key={index} sx={{ color: "warning.400" }} />;
    } else if (index === fullStars && remainder >= 0.5) {
      // Half star
      return <Star key={index} sx={{ color: "warning.400" }} />;
    } else {
      // Empty star
      return <Star key={index} sx={{ color: "warning.200" }} />;
    }
  });

  return (
    <Typography
      level="title-sm"
      sx={{ display: "inline-flex", alignItems: "center" }}
    >
      {stars}
      <p style={{ marginLeft: 5 }}>{props.rating}</p>
    </Typography>
  );
}
