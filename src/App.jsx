import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage'; 
import UserDashboard from './pages/UserDashboard';
import BarberDashboard from './pages/BarberDashboard';
import SignupPage from './pages/SignupPage';
import UserSignup from './pages/UserSignup';
import BarberSignup from './pages/BarberSignup';
import BarberProfile from './pages/BarberProfile';
import UserProfile from './pages/UserProfile';
import MyAppointments from './pages/MyAppointmnts';
import PaymentHistory from './pages/PaymentHistory';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import BDashboard from './pages/BDashboard';
import BarberAppointment from './pages/BarberAppointment';
import Reviews from './pages/Reviews';
import SearchResults from './pages/SearchResult';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<HomePage />} />
          <Route path="/Customer" element={<UserDashboard />} />
          <Route path="/barber" element={<BarberDashboard />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/Customer/sendOTP" element={<UserSignup />} />
          <Route path="/Barber/sendOTP" element={<BarberSignup />} />
          <Route path="/Barber/barber-registration" element={<BarberProfile />} />
          <Route path="/Customer/customer-registration" element={<UserProfile />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="/Customer" element={<UserDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<MyAppointments />} />
            <Route path="paymenthistory" element={<PaymentHistory />}/>
            <Route path="feedback" element={<Feedback />} />
          </Route>

          <Route path="/Barber" element={<BarberDashboard />}>
            <Route path="dashboard" element={<BDashboard />} />
            <Route path="getMyAppointments" element={<BarberAppointment />} />
            <Route path="showMyReviews" element={<Reviews />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
