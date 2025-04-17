import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/logo.png'; 

const Navbar = () => {
  return (
    <nav className="navbarr shadow-sm py-3">
      

        <div className="left-links">
          <a href="/" className="nav-link">Home</a>
          <a href="#shop" className="nav-link">Shop</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

 
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

      <div className='right-link-container'>
      <div className="right-links">
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
        </div>
      </div>
        

    </nav>
  );
};

export default Navbar;
