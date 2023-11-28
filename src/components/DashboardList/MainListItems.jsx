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
import Badge from "@mui/material/Badge";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useBanners from "../../hooks/useBanners";
import useGetUsers from "../../hooks/useGetUsers";
import useTests from "../../hooks/useTests";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";

export const MainListItems = () => {
  const { user } = useAuth();
  const [admin] = useAdmin();
  const [banners] = useBanners();
  const [users] = useGetUsers();
  const [tests] = useTests();
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
                borderRight: "2px solid #082f63",
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
                borderRight: "2px solid #082f63",
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
                borderRight: "2px solid #082f63",
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
      {admin && (
        <>
          <ListItemButton
            sx={{
              color: "#082f63",
              "&.active": {
                backgroundColor: "#ebeced",
                fontWeight: 600,
                borderRight: "2px solid #082f63",
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
                borderRight: "2px solid #082f63",
              },
            }}
            component={NavLink}
            to="/dashboard/allUsers"
          >
            <ListItemIcon>
              <Badge
                badgeContent={users.length}
                sx={{ color: "#082f63" }}
                showZero
              >
                <PeopleOutlineIcon sx={{ color: "#082f63" }} />
              </Badge>{" "}
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "#082f63",
              "&.active": {
                backgroundColor: "#ebeced",
                fontWeight: 600,
                borderRight: "2px solid #082f63",
              },
            }}
            component={NavLink}
            to="/dashboard/addTest"
          >
            <ListItemIcon>
              <DataSaverOnIcon sx={{ color: "#082f63" }} />
            </ListItemIcon>
            <ListItemText primary="Add a Test" />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "#082f63",
              "&.active": {
                backgroundColor: "#ebeced",
                fontWeight: 600,
                borderRight: "2px solid #082f63",
              },
            }}
            component={NavLink}
            to="/dashboard/testManagement"
          >
            <ListItemIcon>
              <Badge
                badgeContent={tests.length}
                sx={{ color: "#082f63" }}
                showZero
              >
                <BiotechIcon sx={{ color: "#082f63" }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Manage Tests" />
          </ListItemButton>

          <ListItemButton
            sx={{
              color: "#082f63",
              "&.active": {
                backgroundColor: "#ebeced",
                fontWeight: 600,
                borderRight: "2px solid #082f63",
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
                borderRight: "2px solid #082f63",
              },
            }}
            component={NavLink}
            to="/dashboard/allBanner"
          >
            <ListItemIcon>
              <Badge
                badgeContent={banners.length}
                sx={{ color: "#082f63" }}
                showZero
              >
                <ImageAspectRatioIcon sx={{ color: "#082f63" }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="All Banners" />
          </ListItemButton>

          <ListItemButton
            sx={{
              color: "#082f63",
              "&.active": {
                backgroundColor: "#ebeced",
                fontWeight: 600,
                borderRight: "2px solid #082f63",
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
