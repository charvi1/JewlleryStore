import {  BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/seller/ProductPage';
import SingleProductPage from '../pages/seller/SingleProductPage';
import SignUp from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
import Home from '../pages/public/Home.jsx';
import ExploreCollection from '../pages/public/ExploreCollection.jsx';
import Navbar from '../pages/public/Navbar.jsx';
import Categories from '../pages/public/Categories.jsx';
import Hero from '../pages/public/Hero.jsx';
import About from '../pages/public/About.jsx';

// Customer routes (currently commented out)
// import Products from '../pages/customer/Products';
// import ProductDetail from '../pages/customer/ProductDetail';
// import Cart from '../pages/customer/Cart';


// Admin routes (currently commented out)
// import Dashboard from '../pages/admin/Dashboard';
const AppRoutes = () => {
  return (
    <>
      <Navbar/>
      
        <Routes>
          {/* Customer Routes (commented out) */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreCollection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />


          {/* Admin Routes (commented out) */}
          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}

          {/* Seller Routes */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<SingleProductPage />} />
          
        </Routes> 
  </>
  );
};

export default AppRoutes;
