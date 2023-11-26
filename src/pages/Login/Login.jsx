import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useDocumentTitle from "../../hooks/useTitle";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import loginbg from "../../assets/loginbg.jpg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CheckBox } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "/nexgenlogo.png";
function Copyright(props) {
  return (
    <Typography variant="body2" color="gray" align="center" {...props}>
      {"Copyright © "}
      <Link to="/" style={{ color: "#082f63", textDecoration: "none" }}>
        NexGen Diagnosis
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const {  signIn } = useAuth();
  // const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleLogIn = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    signIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
        // Swal.fire("Success!", "User logged in successfully", "success");
      })
      .catch(() => setError("Invalid email or password"));
  };
  // const handleGoogleLogin = () => {
  //   googleSignIn()
  //     .then(() => {
  //       navigate(location?.state ? location.state : "/");
  //       Swal.fire(
  //         "Success!",
  //         "User logged in successfully using Google.",
  //         "success"
  //       );
  //     })
  //     .catch(() => setError("Sorry! Something went wrong"));
  // };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("${loginbg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
          }}
        >
          <img style={{ height: "60px" }} src={logo} alt="" />

          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#082f63", fontWeight: 600 }}
          >
            Nex<span style={{ color: "#75E7B6" }}>Gen</span> Diagnosia
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              size="small"
              autoFocus
              sx={{
                "& .MuiInputBase-input": {
                  color: "#082f63",
                },
                "& .MuiInputLabel-root": {
                  color: "#082f63",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  color: "#082f63",
                },
                "& .MuiInputLabel-root": {
                  color: "#082f63",
                },
              }}
            />
            <FormControlLabel
              control={
                <CheckBox value="remember" color="primary" sx={{ mr: 1 }} />
              }
              label="Remember me"
              sx={{ marginLeft: "1px" }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: "#082f63",
                color: "#75E7B6",
              }}
            >
              <Typography>Login</Typography>
            </Button>
            <Grid container style={{ fontSize: "13px" }}>
              <Grid item xs>
                <Link style={{ color: "#082f63", textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item style={{ color: "#082f63" }}>
                Don't have an account?
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    fontWeight: "700",
                    color: "#082f63",
                  }}
                >
                  Register
                </Link>
              </Grid>
            </Grid>

            {/* <hr />
            <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
              Continue with
            </Typography>
            <hr />
            <Button
              onClick={handleGoogleLogin}
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: "#082f63",
                color: "#75E7B6",
              }}
            >
              <GoogleIcon sx={{ mr: 1, color: "#75E7B6", fontSize: "18px" }} />{" "}
              <Typography>Google</Typography>
            </Button> */}
          </Box>
          <Copyright sx={{ mt: 5, mb: 4 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
