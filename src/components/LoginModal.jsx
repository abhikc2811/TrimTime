import { useState } from 'react';

const LoginModal = () => {
  const [role, setRole] = useState('user'); // Default role is 'user'

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder for login logic, for now, log the role
    console.log(`Logged in as: ${role}`);

    // In the future, redirect to respective dashboard based on the role
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
            <div className="row mb-3">
              {/* Role selection buttons with reduced height */}
              <div 
                className={`col-6 py-2 text-center ${role === 'user' ? 'bg-primary text-white' : 'bg-light'}`} 
                onClick={() => handleRoleChange('user')}
                style={{ cursor: 'pointer' }}
              >
                <h5>User</h5>
              </div>
              <div 
                className={`col-6 py-2 text-center ${role === 'barber' ? 'bg-primary text-white' : 'bg-light'}`} 
                onClick={() => handleRoleChange('barber')}
                style={{ cursor: 'pointer' }}
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
