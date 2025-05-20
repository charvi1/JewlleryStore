import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import login from "../../src/assets/login.mp4";
import "./auth.css";

const Login = ({ onClose }) => {
  const [formState, setFormState] = useState("login"); // 'login' | 'forgot' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        EmailId: email,
        Password1: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);  // <-- Update user state here

      toast.success("Login successful!");
      onClose();
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

 

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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to register with:', {
        UserName: userName,
        EmailId: email,
        Password1: password,
        RoleId: 1
      });

      const response = await axios.post("http://localhost:5000/api/users/register", {
        UserName: userName,
        EmailId: email,
        Password1: password,
        RoleId: 1,
      });

      console.log('Registration response:', response.data);

      if (response.data.success) {
        toast.success("Registration successful! Please login.");
        setFormState("login");
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err);
      toast.error(err.response?.data?.message || err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("auth")) {
      onClose();
    }
  };

  return (
    <div className="auth" onClick={handleOverlayClick}>
      <div className="auth-container">
        <div className="auth-right">
          <video className="login-video" autoPlay muted loop>
            <source src={login} type="video/mp4" />
          </video>
        </div>

        <div className="auth-left">
          <button className="close-btn" onClick={onClose} aria-label="Close login modal">
            &times;
          </button>

          {formState === "login" && (
            <>
              <h2>Welcome to Zebaish</h2>
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
                <p onClick={() => setFormState("forgot")} className="forgot-link">Forgot Password?</p>
                <p>Don't have an account? <span onClick={() => setFormState("signup")}>Signup</span></p>
              </form>
            </>
          )}

          {formState === "forgot" && (
            <>
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
                <p onClick={() => setFormState("login")} className="back-link">← Back to Login</p>
              </form>
            </>
          )}

          {formState === "signup" && (
            <>
              <h2>Signup</h2>
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
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
                <button type="submit">Signup</button>
                <p>Already have an account? <span onClick={() => setFormState("login")}>Login</span></p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
