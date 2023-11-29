import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const TestCard = ({ test }) => {
  const { testName, shortDetails, price, date, imageURL, _id } = test;
  const presentDate = dayjs();
  const formattedDate = presentDate.format("YYYY-MM-DD");
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        borderRadius: 5,
      }}
    >
      <img
        src={imageURL}
        alt={testName}
        style={{ width: "100%", height: "200px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            {testName}
          </Typography>
          <Typography variant="body1" fontWeight="500">
            {shortDetails}
          </Typography>
          <Typography variant="body2" color="#082f63" sx={{ mt: 1 }}>
            <strong>Price:</strong> ${price}
          </Typography>
          <Typography
            variant="body2"
            color={`${date <= formattedDate ? "red" : "green"}`}
          >
            <strong style={{ color: "black" }}>Date:</strong>{" "}
            <span>{date}</span>
          </Typography>
        </Box>
        <Box>
          <Button
            LinkComponent={Link}
            to={`/details/${_id}`}
            fullWidth
            variant="contained"
            sx={{
              my: 1,

              backgroundColor: "#082f63",
              color: "#75E7B6",
            }}
          >
            <Typography>View Details</Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestCard;
