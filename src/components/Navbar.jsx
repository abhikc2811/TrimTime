import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    if (!location.pathname.includes('/auth/login')) {
      navigate('/auth/login', { replace: true });
    }
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDashboardClick = async () => {
    try {
      // Fetch both customers and barbers
      const [customersResponse, barbersResponse] = await Promise.all([
        fetch("http://localhost:3001/customers"),
        fetch("http://localhost:3001/barbers"),
      ]);
  
      const [customers, barbers] = await Promise.all([
        customersResponse.json(),
        barbersResponse.json(),
      ]);
  
      // Check if the user is a customer or a barber
      const isCustomer = customers.some((customer) => customer.mobile === user.mobile);
      const isBarber = barbers.some((barber) => barber.mobile === user.mobile);
  
      if (isCustomer) {
        navigate("/customer/dashboard");
      } else if (isBarber) {
        navigate("/barber/dashboard");
      } else {
        alert("User not found in either customers or barbers.");
      }
    } catch (error) {
      console.error("Error checking user type:", error);
      alert("An error occurred. Please try again.");
    }
  };  

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout(); 
    }
    navigate('/'); 
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
          <div className="d-flex ms-auto">
            {user ? (
              <div
                className="dropdown"
                style={{ position: 'relative' }}
              >
                <div
                  className="d-flex align-items-center"
                  onClick={handleProfileClick}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={user.profilePic || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <span className="ms-2 text-white">{user.name}</span>
                </div>
                {dropdownOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-end show"
                    style={{ position: 'absolute', marginTop: '5px'}}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleDashboardClick}
                      >
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <button
                className="btn btn-outline-light me-2"
                onClick={handleLoginClick}
              >
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
