import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";
import axios from 'axios';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = ({ user, onLoginClick, onLogout }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async (email) => {
    if (!email) return;
    try {
      const response = await axios.post("http://localhost:5000/api/cart/get", {
        email: email
      });
      if (response.data.success) {
        const totalItems = response.data.cart.reduce((sum, item) => sum + item.Quantity, 0);
        setCartCount(totalItems);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  useEffect(() => {
    if (user && user.EmailId) {
      fetchCartCount(user.EmailId);
    } else {
      setCartCount(0);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCartCount(0);
    if (onLogout) onLogout();
  };

  return (
    <nav className="navbarr shadow-sm py-3">
      <div className="left-links">
        <a href="/" className="nav-link">Home</a>
        <a href="/explore" className="nav-link">Shop</a>
        <a href="/contact" className="nav-link">Contact</a>
      </div>

      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      
         <div className="right-links">
        {user ? (
          <>
            <Link to="/profile" className="nav-link">
              Hello, {user.UserName}
            </Link>
            <button onClick={handleLogout} className="nav-link" aria-label="Logout">
              <FiLogIn style={{ marginRight: '6px' }} />
            </button>
          </>
        ) : (
          <button
            className="nav-link login-button"
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Login"
          >
            <FaUser />
          </button>
        )}
        <Link
          to="/cart"
          className="nav-link cart-link"
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              onLoginClick();
            }
          }}
        >
          <FaShoppingCart style={{ marginLeft: '10px' }} />
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
