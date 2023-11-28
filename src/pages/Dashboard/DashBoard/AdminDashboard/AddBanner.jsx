import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Container,
} from "@mui/material";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
const dp_hosting_key = import.meta.env.VITE_DP_HOSTING_KEY;
const dp_hosting_api = `https://api.imgbb.com/1/upload?key=${dp_hosting_key}`;
const AddBanner = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleAddBanner = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    const title = data.get("title");
    const text = data.get("text");
    const couponCode = data.get("couponCode");
    const discountRate = data.get("discountRate");
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
          const bannerData = {
            title,
            text,
            image,
            couponCode,
            discountRate,
            isActive: false,
          };
          axiosSecure
            .post("/banners", bannerData)
            .then((res) => {
              if (res.data.insertedId) {
                enqueueSnackbar(`Banner has been added successfully`, {
                  variant: "success",
                  autoHideDuration: 1500,
                });
                navigate("/dashboard/allBanner");
                data = new FormData();
              }
            })
            .catch((err) => console.log(err));
        }
      });
  };
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 155px)",
        backgroundColor: "white",
        padding: "50px 10px",
      }}
    >
      <Typography variant="h3" sx={{ color: "#082f63" }} align="center">
        Add A Banner
      </Typography>
      <Container component="main">
        <Box
          component="form"
          onSubmit={handleAddBanner}
          noValidate
          sx={{
            mt: 5,
          }}
        >
          <Typography variant="h6">Title</Typography>
          <TextField size="small" required fullWidth name="title" autoFocus />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Description
          </Typography>
          <TextField multiline rows={2} name="text" fullWidth />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="h6">Coupon Code</Typography>
              <TextField size="small" required fullWidth name="couponCode" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Discount Percentage</Typography>
              <TextField
                size="small"
                required
                fullWidth
                name="discountRate"
                type="number"
              />
            </Grid>
          </Grid>
          <label>
            <input style={{ display: "none" }} name="photo" type="file" />
            <Button
              component="span"
              variant="contained"
              sx={{
                mt: 2,
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
          <Grid textAlign={"center"}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                my: 2,
                backgroundColor: "#082f63",
                color: "#75E7B6",
              }}
            >
              <Typography>Add Banner</Typography>
            </Button>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AddBanner;
