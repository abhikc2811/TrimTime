import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import the HomePage
import UserDashboard from './pages/UserDashboard'; // Import User Dashboard
import BarberDashboard from './pages/BarberDashboard'; // Import Barber Dashboard
import SignupPage from './pages/SignupPage'; // Import Signup Page
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
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Customer" element={<UserDashboard />} />
          <Route path="/barber" element={<BarberDashboard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/barber-signup" element={<BarberSignup />} />
          <Route path="/barberprofile" element={<BarberProfile />} />
          <Route path="/userprofile" element={<UserProfile />} />
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
      </div>
    </Router>
  );
}

export default App;
