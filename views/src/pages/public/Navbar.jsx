import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const loadUser = () => {
      const storedUserString = localStorage.getItem('user');
      if (storedUserString && storedUserString !== 'undefined') {
        try {
          const parsedUser = JSON.parse(storedUserString);
          setUser(parsedUser);
        } catch (err) {
          console.error("Error parsing user from localStorage:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
  
    loadUser(); // initial load
  
    // ✅ Listen to custom login event
    window.addEventListener('userLoggedIn', loadUser);
  
    return () => {
      window.removeEventListener('userLoggedIn', loadUser);
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav className="navbarr shadow-sm py-3">
      <div className="left-links">
        <a href="/" className="nav-link">Home</a>
       
        <a href="#shop" className="nav-link">Shop</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>

      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <div className="right-link-container">
        <div className="right-links">
          {user ? (
            <>
              {/* ✅ Profile link */}
              <Link to="/profile" className="nav-link">
                Hello, {user.UserName}
              </Link>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
          <Link to="/cart" className="nav-link">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
