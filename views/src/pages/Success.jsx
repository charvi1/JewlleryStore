import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const clearCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        try {
          await axios.post("http://localhost:5000/api/cart/clear", { email: user.EmailId });
          console.log("Cart cleared");
        } catch (error) {
          console.error("Failed to clear cart", error);
        }
      }
    };

    clearCart();

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // redirect to home after 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your order. Redirecting you to homepage...</p>
    </div>
  );
};

export default Success;
