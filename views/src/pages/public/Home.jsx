import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Hero from './Hero';
import About from './About';
import Categories from './Categories';
import Footer from './Footer';
import './home.css';


const Home = () => {
  return (
    <>
      <Hero />
      <About />

      <Categories />
      <Footer/>
    </>
  );
};

export default Home;
