import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import login from "../../src/assets/login.mp4";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

const Login = ({ onClose, setUser }) => {
  const [formState, setFormState] = useState("login"); // login, forgot, signup, reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams(); // for reset-password
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setFormState("reset");
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        EmailId: email,
        Password1: password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Login successful!");
      setTimeout(() => window.location.reload(), 1500);
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
      const response = await axios.post("http://localhost:5000/api/users/register", {
        UserName: userName,
        EmailId: email,
        Password1: password,
        RoleId: 1,
      });
      if (response.data.success) {
        toast.success("Registration successful! Please login.");
        setFormState("login");
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Signup failed.");
    }
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
        password,
      });

      toast.success("Password reset successful! Please log in.");
      navigate("/login"); // redirect to login page after reset
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
        password,
      });

      toast.success("Password reset successful! Please log in.");
      setFormState("login");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("auth")) onClose();
  };

  return (
    <div className="auth" onClick={handleOverlayClick}>
      <ToastContainer />
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
                <p>
                  Don't have an account? <span onClick={() => setFormState("signup")}>Signup</span>
                </p>
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

          {formState === "reset" && (
            <>
              <h2>Reset Password</h2>
              <form onSubmit={handleResetPassword}>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                />
                <button type="submit">Reset Password</button>
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
                <p>
                  Already have an account? <span onClick={() => setFormState("login")}>Login</span>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
