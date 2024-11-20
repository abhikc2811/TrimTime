import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SignupPage.css';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitter, FaFacebook } from 'react-icons/fa';

const UserSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // New state to handle OTP sent logic

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    console.log('Phone Number:', phoneNumber);
    // Simulating OTP send logic here
    setOtpSent(true); // Set OTP sent to true when Get OTP is clicked
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log('Entered OTP:', otp);
    // Add OTP verification logic here
    alert('OTP Verified!');
  };

  const handleRegenerateOtp = () => {
    setOtpSent(false); // Reset OTP sent state when regenerating OTP
    setOtp(''); // Clear OTP input field
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
                />
                <Button variant="primary" type="submit">
                  Get OTP
                </Button>
              </div>
            </Form.Group>
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
            <Button variant="link" onClick={handleRegenerateOtp} className="mt-2">
              Regenerate OTP
            </Button>
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
          className="btn-light btn-lg w-100 mb-3 twitter-button"
          type="submit"
        >
          <FaTwitter size={20} className="me-2" style={{ color: '#018ae5' }} />
          Continue with Twitter
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
