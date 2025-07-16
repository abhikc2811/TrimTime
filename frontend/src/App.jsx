import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage'; 
import UserDashboard from './pages/UserDashboard';
import BarberDashboard from './pages/BarberDashboard';
import SignupPage from './pages/SignupPage';
import SendOtp from './pages/SendOtp';
import UserProfile from './pages/UserProfile';
import MyAppointments from './pages/MyAppointmnts';
import PaymentHistory from './pages/PaymentHistory';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import BDashboard from './pages/BDashboard';
import BarberAppointment from './pages/BarberAppointment';
import Reviews from './pages/Reviews';
import SearchResults from './pages/SearchResult';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/Customer/sendOTP" element={<SendOtp />} />
        <Route path="/Barber/sendOTP" element={<SendOtp />} />
        <Route path="/Barber/barber-registration" element={<UserProfile />} />
        <Route path="/Customer/customer-registration" element={<UserProfile />} />
        <Route path="/search" element={<SearchResults />} />

        {/* Conditionally rendered nested customer routes */}
        <Route path="/Customer" element={<UserDashboard />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="paymenthistory" element={<PaymentHistory />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        {/* Conditionally rendered nested barber routes */}
        <Route path="/Barber" element={<BarberDashboard />}>
          <Route path="dashboard" element={<BDashboard />} />
          <Route path="getMyAppointments" element={<BarberAppointment />} />
          <Route path="showMyReviews" element={<Reviews />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
