import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const UserSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for validation error
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Allow only numeric values
      setPhoneNumber(value);
      setErrorMessage(''); // Clear error on valid input
    }
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    console.log('Phone Number:', phoneNumber);
    setOtpSent(true);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log('Entered OTP:', otp);
    navigate('/userprofile');
  };

  return (
    <div className="container-box">
      <h1>TrimTime</h1>
      <div className="signup-page-container">
        <h3 className="mb-4">User Registration</h3>

        <div className="mb-3">
          <Form onSubmit={handleGetOtp}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="tel"
                  name="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter your phone number"
                  required
                  className="me-2 form-control-lg"
                  maxLength={10} // Limit to 10 characters
                />
                <Button variant="primary" type="submit">
                  Get OTP
                </Button>
              </div>
            </Form.Group>
            {errorMessage && (
              <p className="text-danger mt-2">{errorMessage}</p>
            )}
          </Form>
        </div>

        {otpSent && (
          <div className="mb-3">
            <Form onSubmit={handleVerifyOtp}>
              <Form.Group>
                <Form.Label>Enter OTP</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter the OTP"
                    required
                    className="me-2 form-control-lg"
                  />
                  <Button variant="primary" type="submit">
                    Verify
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        )}

        <div className="or-separator">
          <hr className="line" />
          <span className="or-text">OR</span>
          <hr className="line" />
        </div>

        <Button
          className="btn btn-light btn-lg w-100 mb-3"
          type="submit"
        >
          <FcGoogle size={20} className="me-2" />
          Continue with Google
        </Button>

        <Button
          className="facebook-button btn btn-light btn-lg w-100 mb-4"
          type="submit"
        >
          <FaFacebook size={20} className="me-2" style={{ color: '#145dbf' }} />
          Continue with Facebook
        </Button>
      </div>
    </div>
  );
};

export default UserSignup;
