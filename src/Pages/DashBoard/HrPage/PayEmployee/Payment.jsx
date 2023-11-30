import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckOutFrom from "./CheckOutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_key);
const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOutFrom></CheckOutFrom>
      </Elements>
    </div>
  );
};

export default Payment;
