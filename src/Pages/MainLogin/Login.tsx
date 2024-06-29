import * as React from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Adjust the import for jwtDecode
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
import { useAuth } from "../../contexts/AuthContext";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
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

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements as FormElements; // Cast event elements to FormElements interface
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
      persistent: formElements.persistent?.checked || false,
    };

    try {
      const apiUrl = data.persistent
        ? "https://easyparkfinal.azurewebsites.net/GarageOwnerSignin"
        : "https://easyparkfinal.azurewebsites.net/signin";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        setErrorMessage("");

        // Decode the token to extract user information
        if (result.token) {
          // Decode the JWT token
          const decodedToken: any = jwtDecode(result.token);
          console.log(result.token, decodedToken);
          // Extract user information from the decoded token
          const userEmail = decodedToken.nameid;
          const userName = decodedToken.unique_name;
          const userId = decodedToken.UserId;
          const userRole = data.persistent ? "garageOwner" : "normalUser"; // Determine the user role

          // Store user information in localStorage
          login({
            userEmail: userEmail,
            userName: userName,
            userId: userId,
            email: userEmail,
            authToken: result.token,
            IsLogged: "true",
            userRole: userRole,
          });
        }

        if (data.persistent) {
          navigate("/GarageDashBoard");
        } else {
          navigate("/home");
        }
      } else {
        console.error("Login failed:", response.statusText);
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    // Redirect authenticated users to the dashboard upon mounting
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/GarageDashBoard");
    }
  }, [navigate]);

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
                  <Link to="/JoySignInSideTemplate">Sign in</Link>
                </Typography>
                <Typography level="body-sm">
                  New on EasyPark? <Link to="/signup">Sign up!</Link>
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
                {errorMessage && (
                  <Typography color="danger" textAlign="center">
                    {errorMessage}
                  </Typography>
                )}
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      size="sm"
                      label="Log in as Garage Owner"
                      name="persistent"
                    />
                    <Link to="#">Forgot your password?</Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
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
