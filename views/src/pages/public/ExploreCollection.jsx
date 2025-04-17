import React from "react";
import './explore.css';
import ring from "../../assets/rings.mp4";
import bracelet from "../../assets/bracelet.mp4";
import necklace from "../../assets/necklace.mp4";
import earring from "../../assets/earrings.mp4";
import { Link } from "react-router-dom";

const ExploreCollection = () => {
  return (
    <div className="explore-page">

      {/* RINGS SECTION */}
      <section className="her-section">
        <video className="hero-video" autoPlay muted loop>
          <source src={ring} type="video/mp4" />
        </video>
        <div className="section-content">
          <div className="her-overlay">
            <h1>Crafted For Your Forever Moments</h1>
            <p>Unveil the brilliance of our handcrafted rings.</p>
            <Link to="/products?CategoryId=101" className="shop-now-btn">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* BRACELETS SECTION */}
      <section className="her-section">
        <video className="hero-video" autoPlay muted loop>
          <source src={bracelet} type="video/mp4" />
        </video>
        <div className="section-content reverse">
          <div className="her-overlay">
            <h1>Grace for Your Wrist</h1>
            <p>Discover our unique and elegant bracelet designs.</p>
            <Link to="/products?CategoryId=104" className="shop-now-btn">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* NECKLACES SECTION */}
      <section className="her-section">
        <video className="hero-video" autoPlay muted loop>
          <source src={necklace} type="video/mp4" />
        </video>
        <div className="section-content">
          <div className="her-overlay">
            <h1>Necklaces That Speaks Your Style</h1>
            <p>Explore our exquisite collection of necklaces.</p>
            <Link to="/products?CategoryId=102" className="shop-now-btn">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* EARRINGS SECTION */}
      <section className="her-section">
        <video className="hero-video" autoPlay muted loop>
          <source src={earring} type="video/mp4" />
        </video>
        <div className="section-content reverse">
          <div className="her-overlay">
            <h1>Earrings That Define Elegance</h1>
            <p>Discover stunning designs that elevate every look.</p>
            <Link to="/products?CategoryId=103" className="shop-now-btn">Shop Now</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ExploreCollection;
