import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Assignment";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import useAuth from "../../hooks/useAuth";

export const SecondaryListItems = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    <>
      <ListItemButton
        sx={{
          color: "#082f63",
          "&.active": {
            backgroundColor: "#ebeced",
            fontWeight: 600,
          },
        }}
        component={NavLink}
        to="/"
      >
        <ListItemIcon>
          <HomeIcon sx={{ color: "#082f63" }} />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        sx={{
          color: "#082f63",
          "&.active": {
            backgroundColor: "#ebeced",
            fontWeight: 600,
          },
        }}
        component={NavLink}
        to="/allTests"
      >
        <ListItemIcon>
          <LayersIcon sx={{ color: "#082f63" }} />
        </ListItemIcon>
        <ListItemText primary="All Tests" />
      </ListItemButton>
      <ListItemButton
        sx={{
          color: "#082f63",
        }}
        onClick={handleLogOut}
      >
        <ListItemIcon>
          <LogoutIcon sx={{ color: "#082f63" }} />
        </ListItemIcon>
        <ListItemText primary="LogOut" />
      </ListItemButton>
    </>
  );
};
