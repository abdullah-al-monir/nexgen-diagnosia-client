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
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { enqueueSnackbar } from "notistack";
import PaymentModal from "./PaymentModal";
const TestCardDetails = () => {
  const [userData] = useCurrentUser();
  const testData = useLoaderData();
  const [open, setOpen] = useState(false);

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
  const formattedDate = presentDate.format("YYYY-MM-DD");
  const userEmail = userData.email;
  const userName = userData.name;
  const modalData = { userEmail, userName, price, testName };
  const handleClickOpen = () => {
    if (userData.status === "blocked") {
      return enqueueSnackbar(`Sorry! You can't book for any tests`, {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
    if (date <= formattedDate) {
      return enqueueSnackbar(`Sorry! You can't book for this test`, {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
    if (slotsAvailable === 0) {
      return enqueueSnackbar(`Sorry! No slot available for this test`, {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
    setOpen(true);
  };
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
            onClick={handleClickOpen}
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
      <PaymentModal modalData={modalData} open={open} setOpen={setOpen} />
    </Container>
  );
};
export default TestCardDetails;
