import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = ({ price, testName }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price} testName={testName} />
    </Elements>
  );
};

export default Payment;
