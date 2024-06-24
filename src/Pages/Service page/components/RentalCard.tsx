import React from "react";
import { useNavigate } from "react-router-dom"; // Updated for React Router v6

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import TextRating from "../../../Components/TextRating";

import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import BoltIcon from "@mui/icons-material/Bolt";
import Button from "@mui/joy/Button";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Rating from "./Rating.tsx";

export default function RentalCard(props) {
  const {
    id, // Assuming id is the garage ID
    category,
    title,
    rareFind = false,
    liked = false,
    image,
    isLoggedIn,
    heavyCars,
    charging,
    wifi,
    price,
    rating,
    status,
    onSelectCity,
    onPopupClick,
  } = props;
  const [isLiked, setIsLiked] = React.useState(liked);
  const navigate = useNavigate();

  const handleReserveClick = () => {
    if (isLoggedIn === "true") {
      localStorage.setItem('reservedGarageId', id);
      console.log(`Garage ID ${id} has been reserved`);
      navigate("/pay");
    } else {
      navigate("/login");
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Typography level="body-sm">{category}</Typography>
            <Typography level="title-md">
              <Link
                underline="none"
                href="#interactive-card"
                sx={{ color: "text.primary" }}
              >
                {title}
              </Link>
            </Typography>
          </div>
          <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? "danger" : "neutral"}
            onClick={() => setIsLiked((prev) => !prev)}
            sx={{
              display: { xs: "none", sm: "flex" },
              borderRadius: "50%",
            }}
          >
            <FavoriteRoundedIcon />
          </IconButton>
        </Stack>
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ my: 0.25 }}
        >
          {heavyCars ? (
            <Typography
              level="body-xs"
              startDecorator={<LocalShippingIcon />}
              style={{ color: "green" }}
            >
              Bus parkings Exists
            </Typography>
          ) : (
            <Typography
              level="body-xs"
              startDecorator={<LocalShippingIcon />}
              style={{ color: "red" }}
            >
              Bus parkings Doesn't Exist
            </Typography>
          )}
          {charging ? (
            <Typography
              level="body-xs"
              startDecorator={<BoltIcon />}
              style={{ color: "green" }}
            >
              Charging Station
            </Typography>
          ) : (
            <Typography
              level="body-xs"
              startDecorator={<BoltIcon />}
              style={{ color: "red" }}
            >
              Charging Station Doesn't Exist
            </Typography>
          )}
          {wifi ? (
            <Typography
              level="body-xs"
              startDecorator={<WifiRoundedIcon />}
              style={{ color: "green" }}
            >
              Wifi
            </Typography>
          ) : (
            <Typography
              level="body-xs"
              startDecorator={<WifiRoundedIcon />}
              style={{ color: "red" }}
            >
              Wifi Doesn't Exist
            </Typography>
          )}
        </Stack>
        <Stack direction="row" sx={{ mt: "auto" }}>
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: "right" }}>
            <Typography level="body-md">
              price: <strong>{price}</strong>$
            </Typography>
          </Typography>
        </Stack>
      </CardContent>
      <Rating rating={rating} />
      {status === 1 ? (
        <Button
          variant="outlined"
          color="neutral"
          onClick={onSelectCity}
        >
          View
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="danger"
          onClick={() => console.log("test")}
        >
          Full
        </Button>
      )}
      {status === 0 || status===2 ? (
        <Button
        variant="outlined"
        color="neutral"
        onClick={onSelectCity}
      >
        View
      </Button>
      ):

      <Button variant="solid" color="primary" onClick={handleReserveClick}>
        Reserve
      </Button>
}
    </Card>
  );
}

