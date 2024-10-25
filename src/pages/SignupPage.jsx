import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Assuming this exists
import { BsArrowLeft } from 'react-icons/bs'; // Import an arrow icon from react-icons

const SignupPage = () => {
  const [role, setRole] = useState('user'); // Set initial role to 'user'
  const navigate = useNavigate(); // To navigate to different pages after role selection

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    
    // Redirect to the appropriate signup page
    if (selectedRole === 'user') {
      navigate('/user-signup');  // Navigate to UserSignup component
    } else if (selectedRole === 'barber') {
      navigate('/barber-signup');  // Navigate to BarberSignup component
    }
  };

  const handleBackClick = () => {
    navigate('/'); // Redirect to the homepage
  };

  return (
    <div className="container-box">
      <div className="back-arrow" onClick={handleBackClick}>
          <BsArrowLeft size={24} /> {/* Icon */}
      </div>
      <div className="signup-page-container">
        
        <h2 className="my-4">Create Account</h2>

        {/* Vertical stacking of the role selection cards */}
        <div className="role-selection-container-vertical">
          <Card
            className={`role-card ${role === 'user' ? 'selected' : ''}`}
            onClick={() => handleRoleSelection('user')}
          >
            <Card.Body>
              <Card.Title>User</Card.Title>
              <Card.Text>Sign up as a User</Card.Text>
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
