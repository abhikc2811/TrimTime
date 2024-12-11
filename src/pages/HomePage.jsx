import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FilterSection from '../components/FilterSection';
import Recommendation from '../components/Recommendation';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

const HomePage = () => {
  const [user, setUser] = useState(null); 

  return (
    <>
      <Navbar user={user} /> {/* Pass user details to Navbar */}
      <HeroSection />
      <FilterSection />
      <Recommendation />
      <Footer />
      <LoginModal setUser={setUser} /> {/* Pass setUser to LoginModal */}
    </>
  );
};

export default HomePage;
