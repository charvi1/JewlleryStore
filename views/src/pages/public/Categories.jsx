// src/components/Categories.js
import React from 'react';
import { Link } from "react-router-dom";
import './Categories.css';
import img1 from '../../assets/cat-earrings.svg';
import img2 from '../../assets/cat-necklace.jpg';
import img3 from '../../assets/cat-ring.svg';
import img4 from '../../assets/cat-red-earrings.jpg';
import img5 from '../../assets/cat-hand-ring.jpg';
import img6 from '../../assets/cat-neck.svg';

const Categories = () => {
  return (
    <section className="categories-section py-5">
      <div className="container text-center capsule-container">
          <div className="Earings Capsule">
            <div className="cat-box img-1">
              <img src={img4} alt="Flower Earrings" />
            </div>
            <div className="cat-box-1 bordered">
              <img src={img1} alt="Earrings Icon" className="cat-icon" />
              <h4 className="cat-title">Earrings</h4>
              <p className="cat-desc">Exquisite earrings for every occasion</p>
              <button className="cat-btn">Explore Rings →</button>
            </div>
          </div>
          <div className='Rings Capsule'>
            <div className="cat-box-2 bordered">
              <img src={img3} alt="Rings Icon" className="cat-icon" />
              <h4 className="cat-title">Rings</h4>
              <p className="cat-desc">Engagements, anniversaries, or just because</p>
              <button className="cat-btn">Explore Rings →</button>
            </div>
            <div className="cat-box img-2">
              <img src={img5} alt="Hand Ring" />
            </div>
          </div>
          <div className='Necklace Capsule'>
            <div className="cat-box img-1">
              <img src={img2} alt="Necklace" />
            </div>
            <div className="cat-box-1 bordered">
              <p className="cat-sub">Radiant and chain designs that complement your style</p>
              <h4 className="cat-title">Necklaces</h4>
              <img src={img6} alt="Necklace Icon" className="cat-icon" />
            </div>
          </div>
        </div>

        {/* Browse All Button */}
        <Link to="/explore" className="explore-link mt-3">
        <button className="browse-btn mt-4">
          Browse All Categories <span className="arrow">→</span>
        </button></Link>
    </section>
  );
};

export default Categories;
