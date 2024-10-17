// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // Navbar specific to this page
import HeroSection from '../components/HeroSection';
import FilterSection from '../components/FilterSection';
import Recommendation from '../components/Recommendation';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const HomePage = () => {
  return (
    <>
      <Navbar /> {/* Navbar is part of the page */}
      <HeroSection />
      <FilterSection />
      <Recommendation />
      <Footer />
      <LoginModal />
    </>
  );
};

export default HomePage;
