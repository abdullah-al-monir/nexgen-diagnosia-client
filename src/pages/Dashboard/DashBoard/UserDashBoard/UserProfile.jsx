import {
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  Tooltip,
  NativeSelect,
  InputLabel,
  Fab,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useDivision from "../../../../hooks/useDivision";
import { useState } from "react";
import useDistrict from "../../../../hooks/useDistrict";
import useUpazila from "../../../../hooks/useUpazila";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
const dp_hosting_key = import.meta.env.VITE_DP_HOSTING_KEY;
const dp_hosting_api = `https://api.imgbb.com/1/upload?key=${dp_hosting_key}`;

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const {
    data: userData = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
  const { photoURL, district, upazila, division, bloodGroup, name, email } =
    userData;
  console.log(userData);
  const [error, setError] = useState(null);
  const [divisions] = useDivision();
  const [changeBloodGroup, setBloodGroup] = useState(bloodGroup);
  const [changeDivision, setDivision] = useState(division);
  const [districts] = useDistrict();
  const [changeDistrict, setDistrict] = useState(district);
  const [upazilas] = useUpazila();
  const [changeUpazila, setUpazila] = useState(upazila);

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
    console.log(event.target.value);
    setUpazila(event.target.value);
  };

  const handleSaveProfileInfo = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");

    const imageFile = data.get("photo");
    console.log(name, email, imageFile);
    if (imageFile && imageFile.name !== "") {
      axios
        .post(
          dp_hosting_api,
          { image: imageFile },
          {
            headers: { "content-type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.success) {
            const dp = res.data.data.display_url;
            updateUserProfile(name, dp)
              .then(() => {
                const updatedUserInfo = {
                  name,
                  email,
                  photoURL: dp,
                  bloodGroup: changeBloodGroup || bloodGroup,
                  division: changeDivision || division,
                  district: changeDistrict || district,
                  upazila: changeUpazila || upazila,
                };
                axiosSecure.put("/users", updatedUserInfo).then((res) => {
                  if (res.data.modifiedCount) {
                    refetch();
                  }
                });
              })
              .catch((error) => {
                console.log(error);
                setError("Something went wrong");
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
        });
    } else if (user?.displayName !== name) {
      updateUserProfile(name, photoURL)
        .then(() => {
          const updatedUserInfo = {
            name,
            email,
            photoURL,
            bloodGroup: changeBloodGroup || bloodGroup,
            division: changeDivision || division,
            district: changeDistrict || district,
            upazila: changeUpazila || upazila,
          };
          axiosSecure.put("/users", updatedUserInfo).then((res) => {
            if (res.data.modifiedCount) {
              refetch();
            }
          });
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
        });
    } else {
      const updatedUserInfo = {
        name,
        email,
        photoURL,
        bloodGroup: changeBloodGroup || bloodGroup,
        division: changeDivision || division,
        district: changeDistrict || district,
        upazila: changeUpazila || upazila,
      };
      axiosSecure
        .put("/users", updatedUserInfo)
        .then((res) => {
          if (res.data.modifiedCount) {
            refetch();
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
        });
    }
  };
  if (isPending) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader style={{ color: "#082f63" }} />
      </div>
    );
  }
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 155px)",
        backgroundColor: "white",
        padding: "10px 10px 10px 50px",
      }}
    >
      <form onSubmit={handleSaveProfileInfo}>
        {" "}
        <Grid sx={{ width: { lg: "800px", md: "600px" }, margin: "0px auto" }}>
          <Grid
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              mb: "50px",
            }}
          >
            <Grid sx={{ position: "relative" }}>
              <img
                src={photoURL}
                style={{ height: "100px", borderRadius: "50%" }}
              />
              <Tooltip title="Change Profile picture" placement="top">
                <Fab
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: "5px",
                    right: "-10px",
                    color: "#082f63",
                    backgroundColor: "#d5f2e3",
                  }}
                >
                  <label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="photo"
                    />
                    <EditIcon sx={{ cursor: "pointer" }} />
                  </label>
                </Fab>
              </Tooltip>
            </Grid>
            <Grid>
              <Typography
                variant="h5"
                component="h6"
                sx={{ fontWeight: "bold" }}
              >
                {name}
              </Typography>
              <Typography>
                {district}, {division}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              gap: { xs: "5px", md: "50px" },
              flexDirection: { xs: "column", md: "row", mb: "10px" },
            }}
          >
            <TextField
              name="name"
              label="Name"
              defaultValue={name}
              variant="filled"
              sx={{
                border: "black",
                backgroundColor: "#d5f2e3",
                width: "100%",
                mb: "10px",
              }}
            />
            <TextField
              aria-readonly
              name="email"
              label="Email"
              defaultValue={email}
              variant="filled"
              sx={{
                border: "black",
                backgroundColor: "#d5f2e3",
                width: "100%",
                mb: "10px",
              }}
            />
          </Grid>

          <Grid
            sx={{
              display: "flex",
              gap: { xs: "5px", md: "50px" },
              flexDirection: { xs: "column", md: "row", mb: "10px" },
            }}
          >
            <FormControl
              margin="normal"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: "#082f63",
                },
                "& .MuiInputLabel-root": {
                  color: "#082f63",
                },
                width: "100%",
                backgroundColor: "#d5f2e3",
              }}
            >
              <InputLabel
                variant="standard"
                sx={{ marginLeft: "10px", marginTop: "5px" }}
              >
                Division
              </InputLabel>
              <NativeSelect
                label="Division"
                defaultValue={division}
                variant="filled"
                sx={{ backgroundColor: "#d5f2e3", paddingLeft: "10px" }}
                onChange={handleSelectDivision}
              >
                {divisions.map((division) => (
                  <option key={division.id} value={division.name}>
                    {division.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            <FormControl
              margin="normal"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: "#082f63",
                },
                "& .MuiInputLabel-root": {
                  color: "#082f63",
                },
                width: "100%",
                backgroundColor: "#d5f2e3",
              }}
            >
              <InputLabel
                variant="standard"
                sx={{ marginLeft: "10px", marginTop: "5px" }}
              >
                District
              </InputLabel>
              <NativeSelect
                label="District"
                defaultValue={district}
                variant="filled"
                sx={{ backgroundColor: "#d5f2e3", paddingLeft: "10px" }}
                onChange={handleSelectDistrict}
              >
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              gap: { xs: "5px", md: "50px" },
              flexDirection: { xs: "column", md: "row", mb: "10px" },
            }}
          >
            <FormControl
              margin="normal"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: "#082f63",
                },
                "& .MuiInputLabel-root": {
                  color: "#082f63",
                },
                width: "100%",
                backgroundColor: "#d5f2e3",
              }}
            >
              <InputLabel
                variant="standard"
                sx={{ marginLeft: "10px", marginTop: "5px" }}
              >
                Upazila
              </InputLabel>
              <NativeSelect
                label="Division"
                defaultValue={upazila}
                variant="filled"
                sx={{ backgroundColor: "#d5f2e3", paddingLeft: "10px" }}
                onChange={handleSelectUpazila}
              >
                {upazilas.map((upazila, idx) => (
                  <option key={idx} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: "#082f63",
                },
                "& .MuiInputLabel-root": {
                  color: "#082f63",
                },
                width: "100%",
                backgroundColor: "#d5f2e3",
              }}
            >
              <InputLabel
                variant="standard"
                sx={{ marginLeft: "10px", marginTop: "5px" }}
              >
                Blood Group
              </InputLabel>
              <NativeSelect
                label="Blood Group"
                defaultValue={bloodGroup}
                variant="filled"
                sx={{ backgroundColor: "#d5f2e3", paddingLeft: "10px" }}
                onChange={handleSelectBloodGroup}
              >
                {bloodGroups.map((bloodGroup, idx) => (
                  <option key={idx} value={bloodGroup}>
                    {bloodGroup}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Box
            sx={{
              display: "flex",
              justifyContent: { md: "flex-end", xs: "center" },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#082f63",
                color: "#75E7B6",
              }}
            >
              <Typography>Save</Typography>
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default UserProfile;
