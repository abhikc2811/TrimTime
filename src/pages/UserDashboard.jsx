import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaCalendarCheck, FaHistory, FaCog, FaQuestionCircle, FaSignOutAlt, FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "lightgrey" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white d-flex flex-column p-3"
        style={{
          width: "250px",
          position: "fixed", // Sidebar fixed
          top: 0,
          left: 0,
          height: "100vh", // Ensure it spans the full height
          zIndex: 1000,
        }}
      >
        <h3 className="text-center mb-4">TrimTime</h3>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/user" className="text-white text-decoration-none d-flex align-items-center">
              <FaCalendarCheck className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/user/appointments" className="text-white text-decoration-none d-flex align-items-center">
              <FaCalendarCheck className="me-2" /> My Appointments
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/user/paymenthistory" className="text-white text-decoration-none d-flex align-items-center">
              <FaHistory className="me-2" /> Payment History
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/settings" className="text-white text-decoration-none d-flex align-items-center">
              <FaCog className="me-2" /> Settings
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/help-support" className="text-white text-decoration-none d-flex align-items-center">
              <FaQuestionCircle className="me-2" /> Help & Support
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/user/feedback" className="text-white text-decoration-none d-flex align-items-center">
              <FaStar className="me-2" /> Feedback
            </Link>
          </li>
          <li className="mt-auto">
            <Link to="/logout" className="text-white text-decoration-none d-flex align-items-center">
              <FaSignOutAlt className="me-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: "250px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
