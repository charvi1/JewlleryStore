// pages/RoleRouter.jsx
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import AdminDashboard from "../components/Admin/AdminDashboard";
import CustomerDashboard from "../components/Customer/CustomerDashboard";
import SellerDashboard from "../components/Seller/SellerDashboard";
import ManagerDashboard from "../components/Manager/ManagerDashboard";
import SupportDashboard from "../components/Support/SupportDashboard";

const RoleRouter = () => {
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setRoleId(decoded.RoleId);
    } catch (error) {
      console.error("Invalid token");
    }
  }, []);

  if (!roleId) return <p>Loading...</p>;

  switch (roleId) {
    case 1:
      return <CustomerDashboard />;
    case 2:
      return <SellerDashboard />;
    case 3:
      return <AdminDashboard />;
    case 4:
      return <ManagerDashboard />;
    case 5:
      return <SupportDashboard />;
    default:
      return <p>Role not recognized.</p>;
  }
};

export default RoleRouter;
