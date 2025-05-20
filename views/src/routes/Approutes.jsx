import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProductPage from "../pages/seller/ProductPage";
import SingleProductPage from "../pages/seller/SingleProductPage";
import ProfilePage from "../pages/seller/ProfilePage.jsx";
import SignUp from "../pages/Signup";
import CartPage from "../pages/seller/cartPage.jsx";
import Home from "../pages/public/Home.jsx";
import ExploreCollection from "../pages/public/ExploreCollection.jsx";
import Navbar from "../pages/public/Navbar.jsx";
import Categories from "../pages/public/Categories.jsx";
import About from "../pages/public/About.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/Login";
import ProtectedRoute from './ProtectedRoutes';
import ContactUs from "../pages/public/Contact";

const AppRoutes = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} onLogout={() => window.location.href = "/"} />

      {/* Modal-style login */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreCollection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productId" element={<SingleProductPage onLoginClick={() => setShowLogin(true)} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
