import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Route Protection
import AdminRoute from "../components/AdminRoute";

// Admin Pages
import AdminLogin from "../pages/AdminLogin";
import NotAuthorized from "../pages/NotAuthorized";
import AdminHome from "../components/AdminHome";
import AdminDashboard from "../components/Admin/AdminDashboard";
import Products from "../components/Admin/ProductList";
 import CategoryManager from "../components/Admin/CategoryManager";
// import Orders from "./pages/admin/Orders";

import UserDashboard from "../components/Admin/UserDashboard";
// import Settings from "./pages/admin/Settings";
// import Logout from "./pages/admin/Logout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Not Authorized Page */}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<CategoryManager/>} />
          <Route path="users" element={<UserDashboard/>} />
          {/* <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
