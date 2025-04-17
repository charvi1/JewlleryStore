import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import "./AdminHome.css";

const AdminHome = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
