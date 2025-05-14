import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/forgot-password", {
        email,
      });

      toast.success("Reset link sent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
