import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

const LoginModal = ({ setUser }) => {
  const [role, setRole] = useState('user');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    const modal = document.getElementById('loginModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }

    if (modalBackdrop) {
      modalBackdrop.remove();
    }

    // Ensure proper cleanup of modal-open and body styles
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  useEffect(() => {
    // Cleanup on component unmount to restore scrolling
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleGetOtp = () => {
    if (mobile.trim().length === 10) {
      setIsOtpSent(true);
      alert('OTP has been sent to your mobile number.');
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.trim().length === 6) {
      setIsOtpVerified(true);
      alert('OTP Verified!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      alert('Please verify OTP before logging in.');
      return;
    }

    const loggedInUser = {
      name: role === 'user' ? 'John Doe' : 'Barber Smith',
      profilePic: '',
      mobile,
    };

    setUser(loggedInUser);

    // Close the modal and restore scrolling
    closeModal();

    // Redirect user based on their role
    if (role === 'user') {
      navigate('/');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Login</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3 role-selection">
              <div
                className={`col-6 text-center ${role === 'user' ? 'role-active' : 'role-inactive'}`}
                onClick={() => handleRoleChange('user')}
              >
                <h5>User</h5>
              </div>
              <div
                className={`col-6 text-center ${role === 'barber' ? 'role-active' : 'role-inactive'}`}
                onClick={() => handleRoleChange('barber')}
              >
                <h5>Barber</h5>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex align-items-center">
                <input
                  type="tel"
                  className="form-control me-2"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength="10"
                  required
                />
                <button
                  type="button"
                  className={`btn ${isOtpSent ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={handleGetOtp}
                  disabled={isOtpSent}
                >
                  {isOtpSent ? 'Resend OTP' : 'Get OTP'}
                </button>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!isOtpSent}
                  maxLength="6"
                  required
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleVerifyOtp}
                  disabled={isOtpVerified}
                >
                  {isOtpVerified ? 'Verified' : 'Verify'}
                </button>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={!isOtpVerified}>
                Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>
            <div className="register">
              <a href="/signup">New User? Register Here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
