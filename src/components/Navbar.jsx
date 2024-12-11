import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const generateInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0].toUpperCase())
          .slice(0, 2)
          .join('')
      : 'NA';
  };

  const handleProfileClick = () => {
    if (user && user.role) {
      navigate(user.role === 'user' ? '/customer' : '/barber');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">TrimTime</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact Us</a></li>
          </ul>
          <div className="d-flex">
            {user ? (
              <div
                className="d-flex align-items-center"
                onClick={handleProfileClick}
                style={{ cursor: 'pointer' }}
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  />
                ) : (
                  <div
                    className="rounded-circle text-center text-dark"
                    style={{
                      width: '40px',
                      height: '40px',
                      lineHeight: '40px',
                      backgroundColor: '#f0f0f0',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                  >
                    {generateInitials(user.name)}
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">
                <FaUserCircle size={24} />
                &nbsp;&nbsp;Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
