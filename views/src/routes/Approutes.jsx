import { Routes, Route } from 'react-router-dom'
import Home from '../pages/customer/Home'
import Products from '../pages/customer/Products'
import ProductDetail from '../pages/customer/ProductDetail'
import Cart from '../pages/customer/Cart'
import Login from '../pages/customer/Login'
import Signup from '../pages/customer/Signup'
import Dashboard from '../pages/admin/Dashboard'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default AppRoutes
