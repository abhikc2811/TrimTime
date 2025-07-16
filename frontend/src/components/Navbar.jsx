import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, role, logout, setLoginModalOpen } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true); 
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDashboardClick = () => {
    if (role === 'customer') {
      navigate('/Customer/dashboard', { replace: true });
    } else if (role === 'barber') {
      navigate('/Barber/dashboard', { replace: true });
    } else {
      alert('User role is undefined. Please contact support.');
    }
  };

  const handleLogoutClick = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">TrimTime</a>
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
              <div className="dropdown" style={{ position: 'relative' }}>
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
                    style={{ position: 'absolute', marginTop: '5px', right: '0' }}
                  >
                    <li>
                      <button className="dropdown-item" onClick={handleDashboardClick}>
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogoutClick}>
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
