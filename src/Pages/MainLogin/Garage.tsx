import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import { Link, useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import "./Garage.css";
import SignMap from "./SignMap";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  capacity: HTMLInputElement;
  chargingPoint: HTMLInputElement;
  heavyCars: HTMLInputElement;
  wifi: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const garageId = localStorage.getItem("GarageOwnerId");
  console.log(garageId);
  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      id: "", // You can generate a unique ID here if needed
      type: "local", // Set this to the appropriate value
      geometry: [parseFloat(latitude), parseFloat(longitude)], // Updated to include latitude and longitude
      properties: {
        prop0: "string", // Set this to the appropriate value
        parkId: 0, // Adjust this as needed
      },
      name: formElements.name.value,
      comments: ["string"], // Adjust this as needed
      city: "string", // Set this to the appropriate value
      status: 0, // Adjust this as needed
      info: "string", // Set this to the appropriate value
      rating: 0, // Adjust this as needed
      capacity: formElements.capacity.value,
      containsWifi: formElements.wifi.value === "yes",
      supportsElectricalCharging: formElements.chargingPoint.value === "yes",
      supportsHeavyTrucks: formElements.heavyCars.value === "yes",
      garageOwnerId: garageId, // Set this to the appropriate value or generate it if necessary
    };
    console.log(data);
    try {
      const response = await fetch(
        "https://easypark.azurewebsites.net/parkings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log(response.body);
        // const responseData = await response.json();
        // localStorage.setItem("garageId", response.id);
        // console.log("Garage added successfully:", responseData);
        navigate("/GarageDashBoard"); // Navigate to a success page or perform another action
      } else {
        console.error("Failed to add garage:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const handleLocationChange = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "#fff",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <Link to="/home">
                  <LocalParkingIcon />
                </Link>
              </IconButton>
              <Typography level="title-lg">Easy Park</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign Up
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Garage Name</FormLabel>
                  <Input type="text" name="name" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Garage Capacity</FormLabel>
                  <Input type="number" name="capacity" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Contain Charging Point ? </FormLabel>
                  <div className="cheackBox">
                    <RadioGroup name="chargingPoint">
                      <Radio value="yes" label="Yes" color="success" />
                      <Radio value="no" label="No" color="danger" />
                    </RadioGroup>
                  </div>
                </FormControl>
                <FormControl required>
                  <FormLabel>Support Heavy Cars ? </FormLabel>
                  <div className="cheackBox">
                    <RadioGroup name="heavyCars">
                      <Radio value="yes" label="Yes" color="success" />
                      <Radio value="no" label="No" color="danger" />
                    </RadioGroup>
                  </div>
                </FormControl>
                <FormControl required>
                  <FormLabel>Wifi Available ? </FormLabel>
                  <div className="cheackBox">
                    <RadioGroup name="wifi">
                      <Radio value="yes" label="Yes" color="success" />
                      <Radio value="no" label="No" color="danger" />
                    </RadioGroup>
                  </div>
                </FormControl>
                <div>
                  <FormControl required>
                    <FormLabel>Location</FormLabel>
                    <SignMap onLocationChange={handleLocationChange} />
                  </FormControl>
                </div>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    <Link to="#">Forgot your password?</Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © EasyPark {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://img.getimg.ai/generated/img-bM8PhGWeAyNugZ4EJmWhu.jpeg)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://img.getimg.ai/generated/img-EH0b7Gbw1pfUwmXiTtWnN.jpeg)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
