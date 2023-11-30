import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";
const useStyles = makeStyles({
  card: {
    borderRadius: 16,
    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)",
    height: "100%",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  content: {
    textAlign: "center",
  },
});

const Testimonials = () => {
  const classes = useStyles();
  const axiosPublic = useAxiosPublic();
  const { data: testimonials = [], isPending } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/testimonials`);
      return res?.data;
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
    <Box maxWidth="1280px" sx={{ m: "0px auto 50px auto", p: 5 }}>
      <Typography
        sx={{ my: 5, color: "#082f63", textTransform: "uppercase", fontSize: {md:"45px",xs: "40px"} }}
        align="center"
      >
        Testimonials
      </Typography>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <Typography color="#082f63" variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  "{testimonial.testimonial}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
