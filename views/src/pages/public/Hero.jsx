// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import hero1 from '../../assets/hero1.jpg';
import hero2 from '../../assets/hero2.jpg';
import hero3 from '../../assets/hero3.jpg';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <h1 className="text-center hero-title pt-4">Timeless Elegance</h1>

        <div className="row justify-content-center align-items-center mt-2">
          <div className="col-md-3 text-center">
            <div className="hero-image-wrapper">
              <img src={hero1} alt="Bracelets" className="img-fluid hero-img circle-frame" />
            </div>
            <div className="hero-stats text-start mt-4">
              <p> Crafted With Passion</p>
    
              <p> Modern, Minimal Aesthetic</p>
      
              <p>Designed to Empower</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="hero-image-wrapper">
              <img src={hero2} alt="Main model" className="img-fluid hero-img arch-frame" />
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="hero-text mt-4">
              <p className="hero-subtext">Discover the beauty of handcrafted jewelry</p>
              <div className="d-flex justify-content-center gap-3"><Link to="/explore" className="btn btn-outline-dark shopnow">
              Shop Now ↗ </Link></div>
            </div>
            <div className="hero-image-wrapper">
              <img src={hero3} alt="Earrings" className="img-fluid hero-img circle-frame" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
