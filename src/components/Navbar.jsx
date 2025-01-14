import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  // Function to handle profile click and navigate to the appropriate role page
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
          <div className="d-flex ms-auto"> {/* ms-auto will push the content to the right */}
            {user ? (
              <div
                className="d-flex align-items-center"
                onClick={handleProfileClick}
                style={{ cursor: 'pointer' }}
              >
                {/* Check if profilePic exists, otherwise use the placeholder */}
                <img
                  src={user.profilePic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}  // Fallback to placeholder if no profilePic
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '40px', height: '40px' }}
                />
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
