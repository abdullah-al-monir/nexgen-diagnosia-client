import { Grid, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import BeatLoader from "react-spinners/BeatLoader";
const Banner = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { data: banner = [], isPending } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/active-banner`);
      return res.data;
    },
  });
  const { couponCode, discountRate, image, title, text } = banner;
  const handleGoToTests = () => {
    navigate("/allTests");
  };
  if (isPending) {
    return (
      <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <BeatLoader style={{color: "#082f63"}} />
      </div>
    );
  }
  return (
    <Box
      style={{
        backgroundImage: `url('${image}')`,
        height: "650px",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              sx={{ mb: 2 }}
              fontWeight={700}
              color="white"
            >
              {title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }} color="white">
              {text}
            </Typography>
            <Typography variant="h6" color="white">
              Apply promo code{" "}
              <span style={{ color: "greenyellow" }}>{couponCode}</span> to get{" "}
              {discountRate}% discount
            </Typography>
            <Button
              onClick={handleGoToTests}
              variant="contained"
              sx={{
                width: "200px",
                fontSize: "16px",
                marginTop: "20px",
                backgroundColor: "#082f63",
                color: "greenyellow",
              }}
            >
              ALL TESTS
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: "relative",
                width: "300px",
                height: "200px",
                backgroundColor: "greenyellow",
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "skew(-20deg)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  position: "relative",
                  transform: "skew(20deg)",
                  color: "#082f63",
                  textAlign: "center",
                  zIndex: 1,
                  fontWeight: "700",
                }}
              >
                {discountRate}% OFF
              </Typography>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "greenyellow",
                  transform: "skew(-20deg)",
                  zIndex: 0,
                }}
              ></div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
