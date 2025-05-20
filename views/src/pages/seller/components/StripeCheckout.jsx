// src/components/StripeCheckout.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51PHgJWSEdO7ajODjegmK8TYdHkwnhsJXmPFBRIjOMV0V5EtXI34COsf2oXtvSNHf1EPHpcgpCgwUSmv257E9Gbl3009GP1R3ak"); // Your Stripe Publishable Key (test mode)

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      // Create payment intent on backend
      const { data } = await axios.post("http://localhost:5000/api/payment/create-payment-intent", {
        amount: amount * 100, // convert to smallest currency unit, e.g. rupees to paise
      });

      const clientSecret = data.clientSecret;

      // Confirm card payment on frontend
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Test User",
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert("Payment successful!");
          // handle post-payment logic here
        }
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        Pay ₹{amount}
      </button>
    </form>
  );
};

const StripeCheckout = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export const handleStripeCheckout = async (totalAmount, cartItems, onSuccess) => {
  const stripe = await stripePromise;

  try {
    // Format cart items into Stripe line items
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.Product.ProductName,
        },
        unit_amount: Math.round(parseFloat(item.Product.UnitPrice) * 100), // paise
      },
      quantity: item.Quantity || 1,
    }));

    // Send only lineItems, no amount needed
    const response = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
      lineItems,
    });

    const session = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      onSuccess();
    }
  } catch (err) {
    console.error("Stripe checkout error:", err);
  }
};


export default StripeCheckout;
