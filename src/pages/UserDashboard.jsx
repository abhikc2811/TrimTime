import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCalendarCheck, FaSignOutAlt, FaCommentDots, FaHome } from "react-icons/fa";
import LogoutPopup from "../components/LogoutPopup";

const UserDashboard = () => {
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowPopup(false); 
    setTimeout(() => {
      navigate("/"); 
    }); 
  };
  
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "lightgrey" }}>
      <div
        className="bg-dark text-white d-flex flex-column p-3"
        style={{
          width: "250px",
          position: "fixed", 
          top: 0,
          left: 0,
          height: "100vh", 
          zIndex: 1000,
        }}
      >
        <h3 className="text-center mb-4">TrimTime</h3>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/Customer/dashboard" className="text-white text-decoration-none d-flex align-items-center">
              <MdDashboard className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/Customer/appointments" className="text-white text-decoration-none d-flex align-items-center">
              <FaCalendarCheck className="me-2" /> My Appointments
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/Customer/feedback" className="text-white text-decoration-none d-flex align-items-center">
              <FaCommentDots className="me-2" /> Feedback
            </Link>
          </li>
          <li className="mt-auto">
            <div
              onClick={() => setShowPopup(true)}
              className="text-white text-decoration-none d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </div>            
          </li>
        </ul>
      </div>

      <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: "250px",
        }}
      >
        <div className="text-end">
          <FaHome 
            size={28} 
            color="black" 
            style={{ cursor: "pointer" }} 
            onClick={() => window.location.href = "http://localhost:5173/"}
            title="Go to Home"
          />
        </div>
        <Outlet />
      </div>

      <LogoutPopup
        show={showPopup}
        onConfirm={handleLogout}
        onCancel={() => setShowPopup(false)}
      />
    </div>
  );
};

export default UserDashboard;
