import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LoginModal.css'; // Import the new CSS file

const LoginModal = () => {
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Close the modal and remove the backdrop
    const modal = document.getElementById('loginModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }

    if (modalBackdrop) {
      modalBackdrop.remove(); // Remove the backdrop
    }

    // Remove modal-open class and reset any body padding added by the modal
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';

    // Based on the role, redirect to the respective dashboard
    if (role === 'user') {
      navigate('/user-dashboard');
    } else if (role === 'barber') {
      navigate('/barber-dashboard');
    }

    // Placeholder for login logic, for now, log the role
    console.log(`Logged in as: ${role}`);
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginEmail" placeholder="Enter email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" placeholder="Password" required />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
