// backend/routes/payment.js
const express = require("express");


require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
 // Your Stripe Secret key (test mode)

// Create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // amount in smallest currency unit (e.g. paise for INR)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      // optional: you can add metadata, description, etc.
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment Intent creation failed" });
  }
});
// backend/routes/payment.js (add this below your current route)

router.post('/create-checkout-session', async (req, res) => {
  const { lineItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
       billing_address_collection: 'required', // include India and relevant countries
  
      success_url: 'http://localhost:5173/success',  // adjust URLs
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe create checkout session error:', error);
    res.status(400).json({ error: error.message });
  }
});


module.exports=router;
