import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMediaQuery } from "@mui/material";
import logo from "/nexgenlogo.png";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { MainListItems } from "../components/DashboardList/MainListItems";
import { SecondaryListItems } from "../components/DashboardList/SecondaryListItems";
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const mediumScreen = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    setOpen(!mediumScreen);
  }, [mediumScreen]);
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1280px",
        margin: "0px auto",
        position: "relative",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          position: { xs: "absolute", md: "static" },
          minHeight: "100vh",
          backgroundColor: "#75E7B6",
        }}
        open={open}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            backgroundColor: "#75E7B6",
          }}
        >
          {open && (
            <Box sx={{ m: "auto" }}>
              <img style={{ height: "40px" }} src={logo} alt="" />
            </Box>
          )}
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems />
          <Divider sx={{ my: 1, bgcolor: "#082f63", borderWidth: "1px" }} />
          <SecondaryListItems />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Grid
          container
          justifyContent="center"
          py="9px"
          backgroundColor="#75E7B6"
        >
          <Box sx={{ mr: 1 }}>
            <img style={{ height: "40px" }} src={logo} alt="" />
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 900,
              color: "#082f63",
              textDecoration: "none",
              fontSize: "30px",
            }}
          >
            NexGen Diagnosia
          </Typography>
        </Grid>

        <Container
          maxWidth="lg"
          sx={{
            pt: 4,
            pb: 4,
            pl: { xs: 8, md: "28px" },
            minHeight: "calc(100vh - 88px)",
            backgroundColor: "green",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
