import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";
const About = () => {
  const axiosPublic = useAxiosPublic();
  const { data: aboutArray = [], isPending } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/about`);
      return res.data;
    },
  });
  const about = aboutArray[0];
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
    <Container maxWidth="lg">
      <Box mt={8}>
        <Typography
          fontWeight={700}
          color="#082f63"
          variant="h2"
          align="center"
          gutterBottom
        >
          {about?.name}
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          {about.tagline}
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Typography variant="body1" align="justify">
            {about?.overview}
          </Typography>
        </Paper>
        <Typography color="#082f63" fontWeight="500" variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" align="justify" gutterBottom>
          {about?.mission}
        </Typography>
        <Typography
          color="#082f63"
          fontWeight="500"
          sx={{ mt: 5 }}
          variant="h4"
          gutterBottom
        >
          Our Values
        </Typography>
        <List>
          {about?.values?.map((value, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Typography variant="body1">#</Typography>
              </ListItemIcon>
              <ListItemText primary={value} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography
          color="#082f63"
          fontWeight="500"
          sx={{ mt: 5 }}
          variant="h4"
          gutterBottom
        >
          Our Team
        </Typography>
        <Grid container spacing={4} sx={{ mb: 7 }}>
          {about?.team?.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                variant="outlined"
                sx={{
                  padding: "16px",
                  marginBottom: "24px",
                  height: "100%",
                }}
              >
                <Typography
                  color="#082f63"
                  fontWeight="500"
                  variant="h6"
                  gutterBottom
                >
                  {member.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {member.position}
                </Typography>
                <Typography variant="body2" align="justify">
                  {member.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
