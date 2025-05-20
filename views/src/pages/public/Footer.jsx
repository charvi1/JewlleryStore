import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">Zebaish</h2>
        <p className="footer-text">Crafted Elegance • Timeless Beauty</p>
        <p className="footer-credit">© {new Date().getFullYear()} Zebaish. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
