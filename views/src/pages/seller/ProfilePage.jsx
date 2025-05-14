import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User Data:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="/images/profile-placeholder.png" // Replace with dynamic image if applicable
          alt="Profile"
          className="profile-avatar"
        />
        <h2>Hello, {user.UserName} 👋</h2>
        <p>Email: {user.EmailId}</p>
        <p>Role: {["Customer", "Seller", "Admin", "Manager", "Support"][user.RoleId - 1]}</p>
        <button onClick={() => navigate("/")} className="profile-home-btn">
          Back to Home
        </button>
        <button onClick={handleLogout} className="profile-logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
