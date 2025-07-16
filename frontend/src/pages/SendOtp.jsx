import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { useAuthStore } from '../store/useAuthStore';

const SendOtp = () => {
  const navigate = useNavigate();

  const {
    email,
    otpSent,
    otpVerified,
    error,
    loading,
    role,
    setEmail,
    sendOtp,
    verifyOtp,
    setError,
  } = useAuthStore();

  const [otp, setOtp] = useState('');

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    await sendOtp();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.trim().length !== 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    await verifyOtp(otp);
  };

  useEffect(() => {
    if (otpVerified) {
      const redirectPath =
        role === 'barber'
          ? '/Barber/barber-registration'
          : '/Customer/customer-registration';
      navigate(redirectPath, { state: { email } });
    }
  }, [otpVerified, role, email, navigate]);

  const handleBackClick = () => {
    navigate('/auth/signup');
  };

  const handleResendOtp = async () => {
    await sendOtp();
  };

  return (
    <div className="container-box signup">
      <div className="back-arrow" onClick={handleBackClick}>
        <BsArrowLeft size={24} />
      </div>

      <Card className="signup-page-container mx-auto">
        <Card.Body>
          <h3 className="mb-4 text-center">
            {role === 'barber' ? 'Barber Registration' : 'User Registration'}
          </h3>

          <Form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  if (!otpSent) setEmail(e.target.value);
                  setError('');
                }}
                required
                className="form-control-lg"
                disabled={otpSent}
              />
            </Form.Group>

            {otpSent && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setError('');
                    }}
                    maxLength={6}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <div className="text-end mb-3">
                  <span
                    className="text-primary"
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </span>
                </div>
              </>
            )}

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Please wait...
                </>
              ) : (
                otpSent ? 'Verify & Continue' : 'Send OTP'
              )}
            </Button>
          </Form>

          <div className="or-separator my-4">
            <hr className="line" />
            <span className="or-text">OR</span>
            <hr className="line" />
          </div>

          <Button variant="light" className="btn-lg w-100 mb-3">
            <FcGoogle size={20} className="me-2" />
            Continue with Google
          </Button>
          <Button variant="light" className="btn-lg w-100 mb-3">
            <FaFacebook size={20} className="me-2" style={{ color: '#145dbf' }} />
            Continue with Facebook
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SendOtp;
