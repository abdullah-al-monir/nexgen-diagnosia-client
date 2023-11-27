import Carousel from "react-material-ui-carousel";
import { Container, Typography } from "@mui/material";
import TipsCard from "./TipsCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Tips = () => {
  const axiosPublic = useAxiosPublic();
  const { data: tips = [] } = useQuery({
    queryKey: ["tips"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tips");
      return res.data;
    },
  });
  return (
    <Container sx={{ my: 10 }}>
      <Typography
        variant="h3"
        sx={{ my: 5, color: "#082f63", textTransform: "uppercase" }}
        align="center"
      >
        Health Insights
      </Typography>
      <Carousel
        autoPlay
        animation="slide"
        navButtonsAlwaysVisible
        indicators
        swipe
        duration={500}
      >
        {tips.map((tip, idx) => (
          <TipsCard key={idx} tip={tip} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Tips;
