import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import the HomePage
import UserDashboard from './pages/UserDashboard'; // Import User Dashboard
import BarberDashboard from './pages/BarberDashboard'; // Import Barber Dashboard
import SignupPage from './pages/SignupPage'; // Import Signup Page
import UserSignup from './pages/UserSignup';
import BarberSignup from './pages/BarberSignup';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div>
        {/* Define your Routes */}
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* User Dashboard */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          
          {/* Barber Dashboard */}
          <Route path="/barber-dashboard" element={<BarberDashboard />} />
          
          {/* Signup Page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* UserSignup*/}
          <Route path="/user-signup" element={<UserSignup />} />

          {/* BarberSignup */}
          <Route path="/barber-signup" element={<BarberSignup />} />

          {/* userprofile */}
          <Route path="/userprofile" element={<UserProfile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
