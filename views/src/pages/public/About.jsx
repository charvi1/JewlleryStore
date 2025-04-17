// src/components/About.js
import React from 'react';
import { Link } from "react-router-dom";
import './About.css';
import about1 from '../../assets/about1.jpg';
import about2 from '../../assets/about2.jpg';

const About = () => {
  return (
    <section className="about-section py-5" id="about">
      <div className="container">
        <div className="row align-items-center">
          {/* Left side images */}
          <div className="about-img-cont col-md-6 gap-4">
            <div className='about-img-1-cont'>
              <img src={about1} alt="Model 1" className="about-img rounded-shape about-img-border" /></div>
            <div className='about-img-2-cont'>
              <img src={about2} alt="Model 2" className="about-img rounded-shape" /></div>
          </div>

          {/* Right side text */}
          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="about-title">Jewelry which fit everyone<br />budget and taste !</h2>
            <p className="about-text">
              Jewelry business is highly competitive. Many new and established companies are competing
              in the market armed. Jewelry business is highly competitive. Many new and established
              companies are competing in the market armed.
            </p>
            <p className="about-text">
              Jewelry business is highly competitive. Many new and established companies are competing
              in the market armed. Jewelry business is highly competitive. Many new and established
              companies are
            </p>

            <div className="explore-link mt-3">
            <Link to="/explore" className="explore-link mt-3">
              <span>Explore Collection</span>
              <span className="arrow">→</span>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
