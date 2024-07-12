import React from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function IconButtonMenu() {
  const { isLoggedin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => navigate("/home")}>Home</MenuItem>
        {isLoggedin ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        )}
      </Menu>
    </Dropdown>
  );
}
