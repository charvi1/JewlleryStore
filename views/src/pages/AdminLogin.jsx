import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Only allow login for specific admin
    if (email === "xoxo@gmail.com") {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/admin/dashboard");
    } else {
      alert("Only admin is allowed!");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
