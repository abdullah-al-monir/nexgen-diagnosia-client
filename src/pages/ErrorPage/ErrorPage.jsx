import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" color="error" gutterBottom>
        Error 404
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button LinkComponent={Link} to="/" variant="contained" color="primary">
        Go to Homepage
      </Button>
    </Box>
  );
};

export default ErrorPage;
