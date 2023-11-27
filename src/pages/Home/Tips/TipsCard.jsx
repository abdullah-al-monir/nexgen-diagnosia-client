import { Paper, Box, Typography } from "@mui/material";

const TipsCard = ({ tip }) => {
  const { title, description, bgImage } = tip;
  return (
    <Box
      sx={{
        overflow: "hidden",
      }}
    >
      <Paper
        sx={{
          position: "relative",
          color: "black",
          height: "500px",
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: 5,
            textAlign: "center",
            color: "greenyellow",
            background: "rgba(0, 0, 0, 0.7)",
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant={"h2"}
            component="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
            }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.2rem",
                lg: "1.3rem",
              },
              px: 5,
              color: "white",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TipsCard;
