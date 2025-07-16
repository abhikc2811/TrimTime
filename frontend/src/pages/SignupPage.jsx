import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import { BsArrowLeft } from 'react-icons/bs';
import { useAuthStore } from '../store/useAuthStore';

const SignupPage = () => {
  const navigate = useNavigate();

  const role = useAuthStore(s=> s.role);
  const setRole = useAuthStore(s=>s.setRole);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    const basePath = selectedRole === 'barber' ? '/Barber/sendOTP' : '/Customer/sendOTP';
    navigate(basePath);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="container-box signup">
      <div className="back-arrow" onClick={handleBackClick}>
        <BsArrowLeft size={24} />
      </div>
      <div className="signup-page-container mx-auto">
        <h2 className="my-4 text-center">Create Account</h2>

        <div className="role-selection-container-vertical">
          <Card
            className={`role-card ${role === 'customer' ? 'selected' : ''}`}
            onClick={() => handleRoleSelection('customer')}
          >
            <Card.Body>
              <Card.Title>Customer</Card.Title>
              <Card.Text>Sign up as a Customer</Card.Text>
            </Card.Body>
          </Card>

          <Card
            className={`role-card ${role === 'barber' ? 'selected' : ''}`}
            onClick={() => handleRoleSelection('barber')}
          >
            <Card.Body>
              <Card.Title>Barber</Card.Title>
              <Card.Text>Sign up as a Barber</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
