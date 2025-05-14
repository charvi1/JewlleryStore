// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        EmailId: email,
        Password1: password,
      });

      localStorage.setItem("token", res.data.token);  // Store token
      localStorage.setItem("user", JSON.stringify(res.data.user));  // Store user data
      window.dispatchEvent(new Event('userLoggedIn'));

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p onClick={() => navigate("/forgot-password")} className="forgot-link">Forgot Password?</p>
        <p>Don't have an account? <span onClick={() => navigate("/signup")}>Signup</span></p>
      </form>
    </div>
  );
};

export default Login;
