import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { NavLink } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";
import BiotechIcon from "@mui/icons-material/Biotech";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

export const MainListItems = () => {
  const { user } = useAuth();
  const [admin] = useAdmin();
  return (
    <>
      {user && !admin && (
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
            to="/dashboard/profile"
          >
            <ListItemIcon>
              <PersonOutlineIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
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
            to="/dashboard/appointments"
          >
            <ListItemIcon>
              <CalendarMonthIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
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
            to="/dashboard/reports"
          >
            <ListItemIcon>
              <BarChartIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </>
      )}
      {/* Admin */}
      {user && admin && (
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
            to="/dashboard/dashboard"
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
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
            to="/dashboard/addBanner"
          >
            <ListItemIcon>
              <AddCommentIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Add a Banner" />
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
            to="/dashboard/allBanner"
          >
            <ListItemIcon>
              <ImageAspectRatioIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="All Banners" />
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
            to="/dashboard/allTests"
          >
            <ListItemIcon>
              <BiotechIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Tests" />
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
            to="/dashboard/allUsers"
          >
            <ListItemIcon>
              <PeopleOutlineIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
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
            to="/dashboard/reservation"
          >
            <ListItemIcon>
              <BookOnlineIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Reservations" />
          </ListItemButton>
        </>
      )}
    </>
  );
};
