import {  BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/seller/ProductPage';
import SingleProductPage from '../pages/seller/SingleProductPage';
import ProfilePage from '../pages/seller/ProfilePage.jsx';
import SignUp from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/public/Home.jsx';
import ExploreCollection from '../pages/public/ExploreCollection.jsx';
import Navbar from '../pages/public/Navbar.jsx';
import Categories from '../pages/public/Categories.jsx';
import Hero from '../pages/public/Hero.jsx';
import About from '../pages/public/About.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ProtectedRoute from './ProtectedRoutes';
import ContactUs from "../pages/public/Contact";




const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreCollection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Seller Routes */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productId" element={<SingleProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;