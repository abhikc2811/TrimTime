import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import the HomePage
import UserDashboard from './pages/UserDashboard'; // Import User Dashboard
import BarberDashboard from './pages/BarberDashboard'; // Import Barber Dashboard
import SignupPage from './pages/SignupPage'; // Import Signup Page
import UserSignup from './pages/UserSignup';
import BarberSignup from './pages/BarberSignup';
import UserProfile from './pages/UserProfile';
import MyAppointments from './pages/MyAppointmnts';
import PaymentHistory from './pages/PaymentHistory';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/barber" element={<BarberDashboard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/barber-signup" element={<BarberSignup />} />
          <Route path="/userprofile" element={<UserProfile />} />

          <Route path="/" element={<UserDashboard />}>
            <Route path="user/appointments" element={<MyAppointments />} />
            <Route path="user/paymenthistory" element={<PaymentHistory />}/>
            <Route path="user/feedback" element={<Feedback />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
