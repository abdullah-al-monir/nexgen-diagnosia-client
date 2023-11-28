import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import logo from "/nexgenlogo.png";
import useAdmin from "../../hooks/useAdmin";

function Navbar() {
  const { user, logOut } = useAuth();
  const [admin] = useAdmin();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  const settings = [
    { name: "Profile", link: "/dashboard/profile" },
  ];
  const pages = [
    { name: "Home", link: "/" },
    { name: "All Tests", link: "/allTests" },
    {
      name: `${!admin ? "Appointments" : "Dashboard"}`,
      link: `${!admin ? "/dashboard/appointments" : "/dashboard/dashboard"}`,
    },
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

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#75E7B6" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img style={{ height: "40px" }} src={logo} alt="" />
          </Box>
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
              color="#12352B"
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
                    {page.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img style={{ height: "40px" }} src={logo} alt="" />
          </Box>
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
              fontWeight: 900,
              color: "#082f63",
              textDecoration: "none",
              fontSize: "24px",
            }}
          >
            NexGen Diagnosia
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#082f63",
                  display: "block",
                  "&.active": {
                    color: "#0f64d6",
                    fontWeight: 600,
                  },
                }}
                component={NavLink}
                to={page.link}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    fontSize: "18px",
                  }}
                >
                  {user.displayName}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <img
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                      }}
                      src={user.photoURL}
                      alt=""
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
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <NavLink
                          to={setting.link}
                          style={{
                            fontWeight: "600",
                            color: "#082f63",
                            textDecoration: "none",
                          }}
                        >
                          {setting.name}
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  ))}
                  <Typography textAlign="center">
                    <Button
                      onClick={handleLogOut}
                      style={{
                        backgroundColor: "#082f63",
                        fontWeight: 600,
                        color: "#75E7B6",
                      }}
                    >
                      Logout
                    </Button>
                  </Typography>
                </Menu>
              </Box>
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
