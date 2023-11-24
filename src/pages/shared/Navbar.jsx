import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const pages = [
    { name: "Home", link: "/" },
    { name: "All Tests", link: "/allTests" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Blog", link: "/blog" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //#E9FBF3
  // const navLinks = (
  //   <ul>
  //     <li>
  //       <NavLink
  //         to="/"
  //         sx={(theme) => ({
  //           display: "block",
  //           padding: "8px 16px",
  //           textDecoration: "none",
  //           color: theme.palette.primary.main, // Replace with your primary color
  //           "&:hover": {
  //             color: theme.palette.secondary.main, // Replace with your secondary color
  //           },
  //           "&.active": {
  //             display: "block",
  //             padding: "8px 16px",
  //             backgroundColor: "transparent",
  //             textDecoration: "none",
  //             color: theme.palette.secondary.main, // Replace with your secondary color
  //           },
  //         })}
  //         activeClassName="active"
  //       >
  //         Home
  //       </NavLink>
  //     </li>
  //     <li>
  //       <NavLink
  //         to="/allJobs"
  //         sx={(theme) => ({
  //           display: "block",
  //           padding: "8px 16px",
  //           textDecoration: "none",
  //           color: theme.palette.primary.main, // Replace with your primary color
  //           "&:hover": {
  //             color: theme.palette.secondary.main, // Replace with your secondary color
  //           },
  //           "&.active": {
  //             display: "block",
  //             padding: "8px 16px",
  //             backgroundColor: "transparent",
  //             textDecoration: "none",
  //             color: theme.palette.secondary.main, // Replace with your secondary color
  //           },
  //         })}
  //         activeClassName="active"
  //       >
  //         All Jobs
  //       </NavLink>
  //     </li>
  //     <li>
  //       <NavLink
  //         to="/blogs"
  //         sx={(theme) => ({
  //           display: "block",
  //           padding: "8px 16px",
  //           textDecoration: "none",
  //           color: theme.palette.primary.main, // Replace with your primary color
  //           "&:hover": {
  //             color: theme.palette.secondary.main, // Replace with your secondary color
  //           },
  //           "&.active": {
  //             display: "block",
  //             padding: "8px 16px",
  //             backgroundColor: "transparent",
  //             textDecoration: "none",
  //             color: theme.palette.secondary.main, // Replace with your secondary color
  //           },
  //         })}
  //         activeClassName="active"
  //       >
  //         Blogs
  //       </NavLink>
  //     </li>
  //   </ul>
  // );
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#75E7B6" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 900,
              color: "#082f63",
              textDecoration: "none",
              fontSize: "24px",
            }}
          >
            NexGen Diagnosia
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    style={{
                      color: "#12352B",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                    key={page.name}
                    to={page.link}
                  >
                    <Typography
                      sx={{ textDecoration: "none", color: "inherit" }}
                      textAlign="center"
                    >
                      {page.name}
                    </Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography
                  sx={{ textDecoration: "none", color: "inherit" }}
                  textAlign="center"
                >
                  <NavLink
                    style={{
                      color: "#12352B",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                    key={page.name}
                    to={page.link}
                  >
                    {page.name}
                  </NavLink>
                </Typography>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                {" "}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button style={{ backgroundColor: "#082f63" }}>
                <Link
                  to="/login"
                  style={{
                    fontWeight: "600",
                    color: "#75E7B6",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
