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

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
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

export default function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<string[]>([]);
  const [password, setPassword] = React.useState("");
  const [criteriaStatus, setCriteriaStatus] = React.useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [isPasswordTouched, setIsPasswordTouched] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      name: formElements.name.value,
      email: formElements.email.value,
      password: formElements.password.value,
      persistent: formElements.persistent.checked,
    };

    if (errors.length > 0) {
      alert("Please fix the password errors before submitting.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7140/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(`User created successfully: ${JSON.stringify(result, null, 2)}`);
      navigate("/Login");
       
    } catch (error) {
      console.error("There was a problem with the sign-up request:", error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordTouched(true);
    const validationErrors = validatePassword(newPassword);
    setErrors(validationErrors.errors);
    setCriteriaStatus(validationErrors.criteriaStatus);
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const criteriaStatus = {
      minLength: password.length >= minLength,
      uppercase: uppercaseRegex.test(password),
      lowercase: lowercaseRegex.test(password),
      number: numberRegex.test(password),
      specialChar: specialCharRegex.test(password),
    };

    if (!criteriaStatus.minLength) {
      errors.push(`Password must be at least ${minLength} characters long.`);
    }
    if (!criteriaStatus.uppercase) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!criteriaStatus.lowercase) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!criteriaStatus.number) {
      errors.push("Password must contain at least one number.");
    }
    if (!criteriaStatus.specialChar) {
      errors.push("Password must contain at least one special character.");
    }

    return { errors, criteriaStatus };
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
                <Typography level="body-sm">
                  You are a garage owner?{" "}
                  <Link to="/Garageowner">Sign up!</Link>
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
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {isPasswordTouched && (
                    <Stack sx={{ pl: 0, mt: 2, textAlign: "left" }}>
                      <Typography
                        level="body-sm"
                        sx={{ color: criteriaStatus.minLength ? "#00cc00" : "#cc0000" }}
                      >
                        Password must be at least 8 characters long.
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ color: criteriaStatus.uppercase ? "#00cc00" : "#cc0000" }}
                      >
                        Password must contain at least one uppercase letter.
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ color: criteriaStatus.lowercase ? "#00cc00" : "#cc0000" }}
                      >
                        Password must contain at least one lowercase letter.
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ color: criteriaStatus.number ? "#00cc00" : "#cc0000" }}
                      >
                        Password must contain at least one number.
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ color: criteriaStatus.specialChar ? "#00cc00" : "#cc0000" }}
                      >
                        Password must contain at least one special character.
                      </Typography>
                    </Stack>
                  )}
                </FormControl>
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
                  <Button type="submit" fullWidth disabled={errors.length > 0}>
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
