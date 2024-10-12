import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import Recommendation from './components/Recommendation';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FilterSection />
      <Recommendation />
      <Footer />
      <LoginModal />
      
    </div>
  );
}

export default App;
