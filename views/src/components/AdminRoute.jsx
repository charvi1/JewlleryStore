import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.RoleId !== 3) 
    if (user?.email !== "xoxo@gmail.com")  {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default AdminRoute;
