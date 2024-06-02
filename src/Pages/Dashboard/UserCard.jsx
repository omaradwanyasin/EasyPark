import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import "./DDashboardPage.css";

export default function UserCard(props) {
  const [isVisable, setIsVisable] = React.useState(true);
  const handleReject = () => {
    setIsVisable(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}//testing 
    >
      {isVisable && (
        <Card
          className="Information"
          orientation="horizontal"
          sx={{
            width: "90%",
            flexWrap: "wrap",
            [`& > *`]: {
              "--stack-point": "500px",
              minWidth:
                "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
            },
            // make the card resizable for demo
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
            <img src={props.img} srcSet={props.img} loading="lazy" alt="" />
          </AspectRatio>
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              {props.name}
            </Typography>

            <Sheet
              sx={{
                bgcolor: "background.level1",
                borderRadius: "sm",
                p: 1.5,
                my: 1.5,
                display: "flex",
                gap: 2,
                "& > div": { flex: 1 },
              }}
            >
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Phone number
                </Typography>
                <Typography fontWeight="lg">{props.phone}</Typography>
              </div>
              <div>
                <Typography level="body-xs" fontWeight="lg">
                  Reservation ID
                </Typography>
                <Typography fontWeight="lg">#{props.id}</Typography>
              </div>
            </Sheet>
            <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
              <Button variant="outlined" color="neutral" onClick={handleReject}>
                Reject
              </Button>
              <Button
                variant="solid"
                color="primary"
                onClick={props.increaseCounter}
              >
                Accept
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
