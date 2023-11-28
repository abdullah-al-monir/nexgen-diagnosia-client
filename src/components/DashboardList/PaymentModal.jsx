import {
  Typography,
  IconButton,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  Input,
  Grid,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import BeatLoader from "react-spinners/BeatLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useActiveBanner from "../../hooks/useActiveBanner";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import Payment from "../../pages/Payment/Payment";
const UserDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: 2,
  },
  "& .MuiDialogActions-root": {
    padding: 1,
  },
}));
export default function PaymentModal({ modalData, open, setOpen }) {
  const [coupon, setCoupon] = useState(null);
  const [paymentOption, setPaymentOption] = useState(false);
  const [banner, isPending] = useActiveBanner();
  const {
    userEmail,
    userName,
    price: initialPrice,
    testName,
  } = modalData || {};
  const [price, setPrice] = useState(initialPrice);
  const handleClose = () => {
    setPaymentOption(false);
    setCoupon(null);
    setOpen(false);
  };
  console.log(banner.couponCode);
  const handleApplyCoupon = () => {
    console.log(coupon);
    if (banner.couponCode !== coupon) {
      return enqueueSnackbar(`Invalid coupon code`, {
        variant: "warning",
        autoHideDuration: 1500,
      });
    }
    const discountPrice = Math.ceil(
      price - (price * banner.discountRate) / 100
    );
    setPrice(discountPrice);
  };
  if (isPending) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader style={{ color: "#082f63" }} />
      </div>
    );
  }
  const handleOpenPayment = () => {
    setPaymentOption(true);
  };
  return (
    <>
      <UserDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            textAlign: "center",
            minWidth: { md: "500px", sm: "auto" },
            fontSize: "2rem",
          }}
          id="customized-dialog-title"
        >
          Payment Info
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ m: 5, mt: 0, py: 2 }} dividers>
          <Typography
            sx={{ mt: 1, fontSize: "1.5rem" }}
            variant="body1"
            gutterBottom
          >
            <strong>Patient Name:</strong> {userName}
          </Typography>
          <Typography sx={{ fontSize: "1.5rem" }} variant="body1" gutterBottom>
            <strong>Email:</strong> {userEmail}
          </Typography>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
              mb: 1,
              borderTop: 1,
              borderBottom: 1,
              borderColor: "#082f63",
            }}
          >
            <Typography sx={{ fontSize: "1.6rem" }} variant="body1">
              <strong>Test Name</strong>
            </Typography>

            <Typography sx={{ fontSize: "1.6rem" }} variant="body1">
              <strong>Price</strong>
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{ fontSize: "1.5rem" }}
              variant="body1"
              gutterBottom
            >
              {testName}
            </Typography>
            <Typography
              sx={{ fontSize: "1.5rem" }}
              variant="body1"
              gutterBottom
            >
              ${initialPrice}
            </Typography>
          </Grid>
          <Grid>
            {paymentOption ? (
              <>
                <Typography
                  sx={{
                    my: 1,
                    fontSize: "18px",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Payment by Card
                </Typography>{" "}
                <Payment testName={testName} price={price} />
              </>
            ) : (
              <>
                {banner.couponCode === coupon ? (
                  <>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        textAlign="right"
                        sx={{ fontSize: "1.5rem" }}
                        variant="body1"
                        gutterBottom
                      >
                        <strong>Discount:</strong>
                      </Typography>
                      <Typography
                        textAlign="right"
                        sx={{ fontSize: "1.5rem" }}
                        variant="body1"
                        gutterBottom
                      >
                        -$
                        {price -
                          Math.ceil(
                            price - (price * banner.discountRate) / 100
                          )}
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        textAlign="right"
                        sx={{ fontSize: "1.5rem" }}
                        variant="body1"
                        gutterBottom
                      >
                        <strong>Discount Price:</strong>
                      </Typography>
                      <Typography
                        textAlign="right"
                        sx={{ fontSize: "1.5rem" }}
                        variant="body1"
                        gutterBottom
                      >
                        $
                        {Math.ceil(price - (price * banner.discountRate) / 100)}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        mb: 1,
                        fontSize: "1.8rem",
                      }}
                    >
                      <Typography
                        sx={{
                          display: `${
                            banner.couponCode === coupon ? "none" : "flex"
                          }`,
                          fontSize: "1.5rem",
                        }}
                        variant="body1"
                        gutterBottom
                      >
                        <strong>Apply Promo Code:</strong>
                      </Typography>
                      <Grid
                        sx={{
                          display: `${
                            banner.couponCode === coupon ? "none" : "flex"
                          }`,
                          alignItems: "center",
                        }}
                      >
                        <Input
                          onBlur={(e) => setCoupon(e.target.value)}
                          sx={{
                            marginLeft: "5px",
                            color: "#082f63",
                            border: "1px solid #082f63",
                            px: 1,
                            borderRight: 0,
                          }}
                        />
                        <Button
                          onClick={handleApplyCoupon}
                          variant="contained"
                          sx={{ color: "#75E7B6", backgroundColor: "#082f63" }}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
                <Button
                  onClick={handleOpenPayment}
                  variant="contained"
                  fullWidth
                  sx={{
                    color: "#75E7B6",
                    backgroundColor: "#082f63",
                  }}
                >
                  Pay
                </Button>
              </>
            )}
          </Grid>
        </DialogContent>
      </UserDialog>
    </>
  );
}
