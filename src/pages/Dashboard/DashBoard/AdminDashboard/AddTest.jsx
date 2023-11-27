import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import dayjs from "dayjs";
const dp_hosting_key = import.meta.env.VITE_DP_HOSTING_KEY;
const dp_hosting_api = `https://api.imgbb.com/1/upload?key=${dp_hosting_key}`;
const AddTest = () => {
  const presentDate = dayjs();
  const [date, setDate] = useState(presentDate);
  const formattedDate = date.format("YYYY-MM-DD");
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleAddTest = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    const testName = data.get("testName");
    const shortDetails = data.get("shortDetails");
    const details = data.get("details");
    const price = data.get("price");
    const slots = data.get("slots");
    const imageFile = { image: data.get("photo") };

    axiosPublic
      .post(dp_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const image = res.data.data.display_url;
          const testData = {
            testName,
            details,
            shortDetails,
            slots,
            price,
            date: formattedDate,
            imageURL: image,
            slotsAvailable: slots,
            booked: 0,
          };
          axiosSecure
            .post("/Tests", testData)
            .then((res) => {
              if (res.data.insertedId) {
                enqueueSnackbar(`Test has been added successfully`, {
                  variant: "success",
                  autoHideDuration: 1500,
                });
                navigate("/dashboard/testManagement");
                data = new FormData();
              }
            })
            .catch((err) => console.log(err));
        }
      });
  };
  return (
    <Box sx={{ bgcolor: "white", py: 5 }}>
      <Typography variant="h3" sx={{ color: "#082f63" }} align="center">
        Add A Test
      </Typography>
      <Container component="main">
        <Box
          component="form"
          onSubmit={handleAddTest}
          noValidate
          sx={{
            mt: 5,
          }}
        >
          <Typography variant="h6">Name of the Test</Typography>
          <TextField required fullWidth name="testName" autoFocus />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Short Details
          </Typography>
          <TextField multiline rows={2} name="shortDetails" fullWidth />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Description
          </Typography>
          <TextField multiline rows={4} name="details" fullWidth />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="h6">Price</Typography>
              <TextField required fullWidth name="price" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Slots</Typography>
              <TextField required fullWidth name="slots" type="number" />
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              my: 3,
              gap: 3,
            }}
          >
            <label style={{ width: "50%" }}>
              <input
                style={{ display: "none", width: "1px" }}
                name="photo"
                type="file"
              />
              <Button
                fullWidth
                component="span"
                variant="contained"
                sx={{
                  py: 2,
                  backgroundColor: "#75E7B6",
                  color: "#082f63",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#5AC79B",
                  },
                }}
              >
                Upload Photo
              </Button>
            </label>
            <Grid width={"50%"}>
              <Typography variant="h6">Date</Typography>
              <DatePicker
                minDate={dayjs()}
                sx={{
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.30)",
                  borderRadius: 2,
                  border: "1px solid transparent",
                }}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Grid>
          </Grid>
          <Grid textAlign={"center"}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                my: 2,
                py: 1,
                backgroundColor: "#082f63",
                color: "#75E7B6",
              }}
            >
              <Typography>Add Test</Typography>
            </Button>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AddTest;
