import {
  Card,
  Container,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useLoaderData } from "react-router-dom";
const TestCardDetails = () => {
  const testData = useLoaderData();
  console.log(testData);
  const {
    testName,
    shortDetails,
    details,
    price,
    date,
    slotsAvailable,
    slots,
    imageURL,
    booked,
  } = testData;
  const presentDate = dayjs();
  console.log(date);
  const formattedDate = presentDate.format("YYYY-MM-DD");
 
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardMedia
          component="img"
          alt={testName}
          height="400"
          image={imageURL}
        />
        <CardContent>
          <Typography
            gutterBottom
            fontWeight="700"
            variant="h5"
            component="div"
          >
            {testName}
          </Typography>
          <Typography variant="body3" fontWeight="500" color="#082f63">
            {shortDetails}
          </Typography>
          <Typography variant="body2" color="#082f63" style={{ marginTop: 10 }}>
            {details}
          </Typography>
          <Typography variant="body2" color="#082f63" style={{ marginTop: 10 }}>
            <strong style={{ color: "black" }}>Price:</strong> ${price}
          </Typography>
          <Typography
            variant="body2"
            color={`${date <= formattedDate ? "red" : "green"}`}
          >
            <strong style={{ color: "black" }}>Date:</strong> {date}
          </Typography>
          <Typography variant="body2" color="#082f63">
            <strong style={{ color: "black" }}>Available Slots :</strong>{" "}
            <span style={{ color: ` ${slotsAvailable === 0 && "red"}` }}>
              {slotsAvailable}
            </span>
            /{slots}
          </Typography>
          <Typography variant="body2" color="#082f63">
            <strong style={{ color: "black" }}>Booked :</strong> {booked}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "flex-start" }}>
          <Button
            size="small"
            type="submit"
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: "#082f63",
              color: "#75E7B6",
              ml: 1,
            }}
          >
            <Typography>Book Now</Typography>
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
export default TestCardDetails;
