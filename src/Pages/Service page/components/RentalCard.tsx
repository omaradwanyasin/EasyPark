import React from "react";

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
  const { category, title, rareFind = false, liked = false, image } = props;
  const [isLiked, setIsLiked] = React.useState(liked);

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
         {props.heavyCars? (
          <Typography level="body-xs" 
          startDecorator={<LocalShippingIcon />} 
            style={{color:"green"}}>
            Bus parkings Exists
          </Typography>
         ):(
          <Typography
          level="body-xs"
          startDecorator={<LocalShippingIcon />}
          style={{ color: "red" }} // Apply red color if charging is false
        >
          Bus parkings Doesn't Exist
        </Typography>
         )  
        
        }
        { props.charging? (
          <Typography level="body-xs" startDecorator={<BoltIcon />}
          style={{ color: "green" }}>
            Charging Station
          </Typography>
        ):(
          <Typography
          level="body-xs"
          startDecorator={<BoltIcon  />}
          style={{ color: "red" }} // Apply red color if charging is false
        >
          Charging Station Doesn't Exist
        </Typography>
        )  
        
        }
         { props.charging? (
          <Typography level="body-xs" startDecorator={<WifiRoundedIcon />}
          style={{ color: "green" }}>
            Wifi
          </Typography>
        ):(
          <Typography
          level="body-xs"
          startDecorator={<WifiRoundedIcon  />}
          style={{ color: "red" }} // Apply red color if charging is false
        >
          Wifi Doesn't Exist
        </Typography>
        )  
        
        }
        
        </Stack>
        <Stack direction="row" sx={{ mt: "auto" }}>
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: "right" }}>
            <strong>{props.price}</strong>{" "}
            <Typography level="body-md">price: 3$</Typography>
          </Typography>
        </Stack>
      </CardContent>
      <Rating rating={props.rating} />
      {props.status === 1 ? (
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => props.onSelectCity()}
        >
          View
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="danger"
          onClick={() => {
            console.log("test");
          }}
        >
          Full
        </Button>
      )}
      <Button variant="solid" color="primary">
        Reserve
      </Button>
    </Card>
  );
}
