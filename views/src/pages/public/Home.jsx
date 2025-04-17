import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Categories from './Categories';
import './home.css';
import ExploreCollection from './ExploreCollection';


const Home = () => {
  return (
    <>
      <Hero />
      <About />

      <Categories />
    </>
  );
};

export default Home;
