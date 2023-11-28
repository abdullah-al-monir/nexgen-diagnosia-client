import useAxiosPublic from "../../hooks/useAxiosPublic";
import BlogCard from "./blogCard";
import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";
const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const { data: blogs = [], isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs`);
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
    <Box mx="auto" px={{ xs: 5, md: 12, lg: 24 }} py={12}>
      <Typography
        variant="h3"
        sx={{ mb: 10, color: "#082f63", textTransform: "uppercase" }}
        align="center"
      >
        Blogs by Health Specialists
      </Typography>
      <Grid container spacing={6}>
        {blogs?.map((card, index) => (
          <BlogCard key={index} card={card} />
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
