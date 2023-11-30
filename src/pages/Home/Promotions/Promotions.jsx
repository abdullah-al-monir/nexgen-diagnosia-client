import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Typography } from "@mui/material";
import PromotionCard from "./PromotionCard";
const Promotions = () => {
  const axiosPublic = useAxiosPublic();
  const { data: promotions = [], isPending } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/promotions`);
      return res?.data;
    },
  });
  return (
    <Box maxWidth="1280px" sx={{ p: { md: 5, xs: 2 }, mx: "auto" }}>
      <Typography
        variant="h3"
        sx={{ my: 5, color: "#082f63", textTransform: "uppercase" }}
        align="center"
      >
        Current Offers
      </Typography>

      <Grid container spacing={2} sx={{ maxWidth: 1280, margin: "auto" }}>
        {promotions.map((card) => (
          <Grid key={card.id} item xs={12} sm={6}>
            <PromotionCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Promotions;
