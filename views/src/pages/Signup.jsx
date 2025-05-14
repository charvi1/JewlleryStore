import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./auth.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        UserName: userName,
        EmailId: email,
        Password1: password1,
        RoleId: 1,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" required value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password1} onChange={(e) => setPassword1(e.target.value)} />
        <button type="submit">Signup</button>
        <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
      </form>
    </div>
  );
};

export default Signup;
