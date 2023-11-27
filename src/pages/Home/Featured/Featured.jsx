import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Container, Grid, Typography } from "@mui/material";
import TestCard from "../../../components/DashboardList/TestCard";
import BeatLoader from "react-spinners/BeatLoader";
const Featured = () => {
  const axiosPublic = useAxiosPublic();
  const { data: featuredTests = [], isPending } = useQuery({
    queryKey: ["featuredTests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured");
      return res.data;
    },
  });
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
  return (
    <Container sx={{ my: 10 }}>
      <Typography
        variant="h3"
        sx={{ my: 5, color: "#082f63", textTransform: "uppercase" }}
        align="center"
      >
        Featured Tests
      </Typography>
      <Grid container spacing={2}>
        {featuredTests.map((test, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <TestCard test={test} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Featured;
