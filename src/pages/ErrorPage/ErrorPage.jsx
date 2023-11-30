import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import errorBg from "/errorPage.jpg";
const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url('${errorBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography fontWeight={700} variant="h1" color="red" gutterBottom>
        Oops! Page not found
      </Typography>
      <Button
        sx={{ backgroundColor: "#082f63", color: "greenyellow" }}
        LinkComponent={Link}
        to="/"
        variant="contained"
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default ErrorPage;
