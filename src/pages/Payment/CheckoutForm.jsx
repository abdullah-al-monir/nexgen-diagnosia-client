import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Button, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
const CheckoutForm = ({ price, testName }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(price);
  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          testName,
          userName: user?.displayName,
          email: user?.email,
          price: price,
          transactionId: paymentIntent.id,
          date: dayjs(),
          status: "pending",
        };

        const res = await axiosSecure.post("/appointments", payment);
        console.log("payment saved", res.data);

        if (res.data?.insertedId) {
          console.log("ok");
          enqueueSnackbar(`Thanks for the payment`, {
            variant: "success",
            autoHideDuration: 1500,
          });
          navigate("/dashboard/appointments");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#082f63",
              backgroundColor: "",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: "#082f63",
          color: "#75E7B6",
          my: 4,
        }}
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay {price}
      </Button>
      <Typography variant="body1" sx={{ color: "red" }}>
        {error}
      </Typography>
      {transactionId && (
        <Typography variant="body1" sx={{ color: "green" }}>
          Your transaction id: {transactionId}
        </Typography>
      )}
    </form>
  );
};
export default CheckoutForm;
