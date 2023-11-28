import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useDocumentTitle from "../../hooks/useTitle";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import loginbg from "../../assets/loginbg.jpg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "/nexgenlogo.png";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useUpazila from "../../hooks/useUpazila";
import useDistrict from "../../hooks/useDistrict";
import useDivision from "../../hooks/useDivision";
import { enqueueSnackbar } from "notistack";
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
const dp_hosting_key = import.meta.env.VITE_DP_HOSTING_KEY;
const dp_hosting_api = `https://api.imgbb.com/1/upload?key=${dp_hosting_key}`;
const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [divisions] = useDivision();
  const [bloodGroup, setBloodGroup] = useState("");
  const [division, setDivision] = useState("");
  const [districts] = useDistrict();
  const [district, setDistrict] = useState("");
  const [upazilas] = useUpazila();
  const [upazila, setUpazila] = useState("");

  const handleSelectBloodGroup = (event) => {
    setBloodGroup(event.target.value);
  };
  const handleSelectDivision = (event) => {
    console.log(event.target.value);
    setDivision(event.target.value);
  };
  const handleSelectDistrict = (event) => {
    console.log(event.target.value);
    setDistrict(event.target.value);
  };
  const handleSelectUpazila = (event) => {
    setUpazila(event.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    console.log(name, email, password);
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      upazila === "" ||
      district === "" ||
      bloodGroup === ""
    ) {
      return setError("Please fill all the field");
    }

    if (password !== confirmPassword) {
      return setError("Password don't match");
    }
    createUser(email, password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      const imageFile = { image: data.get("photo") };

      axiosPublic
        .post(dp_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            const dp = res.data.data.display_url;
            updateUserProfile(name, dp)
              .then(() => {
                const userInfo = {
                  name,
                  email,
                  photoURL: dp,
                  bloodGroup,
                  division,
                  district,
                  upazila,
                  status: "active",
                  role: "user",
                };
                console.log(userInfo);
                axiosPublic
                  .post("/users", userInfo)
                  .then((res) => {
                    if (res.data.insertedId) {
                      console.log("user added to the database");
                      enqueueSnackbar(`Registration successful`, {
                        variant: "success",autoHideDuration: 1500,
                      });
                      navigate("/");
                      data = new FormData();
                    }
                  })
                  .catch((err) => console.log(err));
              })
              .catch((error) => {
                console.log(error);
                setError("Something went wrong");
              });
          }
        });
    });
  };
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
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
        maxWidth="sm"
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
            onSubmit={handleRegister}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid
              sx={{
                display: "flex",
                gap: { xs: "5px", md: "10px" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
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
                id="email"
                label="Email Address"
                name="email"
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
            </Grid>
            <Grid
              sx={{
                display: "flex",
                gap: { xs: "5px", md: "10px" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <FormControl
                margin="normal"
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#082f63",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#082f63",
                  },
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <InputLabel>Division</InputLabel>
                <Select
                  value={division.name}
                  label="division"
                  onChange={handleSelectDivision}
                >
                  {divisions.map((division) => (
                    <MenuItem key={division.id} value={division.name}>
                      {division.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                margin="normal"
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#082f63",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#082f63",
                  },
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <InputLabel>District</InputLabel>
                <Select
                  required
                  value={district.name}
                  label="District"
                  onChange={handleSelectDistrict}
                >
                  {districts.map((district, idx) => (
                    <MenuItem key={idx} value={district.name}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                gap: { xs: "5px", md: "10px" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <FormControl
                margin="normal"
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#082f63",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#082f63",
                  },
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <InputLabel required>Upazila</InputLabel>
                <Select
                  value={upazila.name}
                  label="Upazila"
                  onChange={handleSelectUpazila}
                >
                  {upazilas.map((upazila, idx) => (
                    <MenuItem key={idx} value={upazila.name}>
                      {upazila.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                margin="normal"
                size="small"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#082f63",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#082f63",
                  },
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <InputLabel>Blood Group</InputLabel>
                <Select
                  value={bloodGroup}
                  label="Blood Group"
                  onChange={handleSelectBloodGroup}
                >
                  {bloodGroups.map((group, idx) => (
                    <MenuItem key={idx} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
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
            <Grid>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="photo"
                  type="file"
                />

                <Button
                  component="span"
                  variant="contained"
                  sx={{
                    mt: 1,
                    py: 1,
                    backgroundColor: "#75E7B6",
                    color: "#082f63",
                    "&:hover": {
                      backgroundColor: "#5AC79B",
                    },
                  }}
                >
                  Upload Photo
                </Button>
              </label>
            </Grid>
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
              <Typography>Register</Typography>
            </Button>
            <Grid container style={{ fontSize: "13px" }}>
              <Grid item style={{ color: "#082f63" }}>
                Already have an account?
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    fontWeight: "700",
                    color: "#082f63",
                  }}
                >
                  Login
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5, mb: 4 }} />
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
