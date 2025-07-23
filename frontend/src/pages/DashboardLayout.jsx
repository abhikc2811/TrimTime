import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaCommentDots, FaHome, FaSignOutAlt, FaStar } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import LogoutPopup from "../components/LogoutPopup";
import { useAuthStore } from "../store/useAuthStore";

const DashboardLayout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const rawRole = useAuthStore((state) => state.user?.role);
  const role = rawRole
    ? rawRole.trim().toLowerCase() === 'barber'
      ? 'Barber'
      : 'Customer'
    : null;

  const handleLogout = () => {
    setShowPopup(false);
    setTimeout(() => {
      navigate("/");
    });
  };

  const navConfig = {
    Barber: [
      { to: "/Barber/dashboard", icon: <MdDashboard />, label: "Dashboard" },
      { to: "/Barber/appointments", icon: <FaCalendarCheck />, label: "Get My Appointments" },
      { to: "/Barber/showMyReviews", icon: <FaStar />, label: "Show My Reviews" },
      { to: "/Barber/feedback", icon: <FaCommentDots />, label: "Feedback" },
    ],
    Customer: [
      { to: "/Customer/dashboard", icon: <MdDashboard />, label: "Dashboard" },
      { to: "/Customer/appointments", icon: <FaCalendarCheck />, label: "My Appointments" },
      { to: "/Customer/feedback", icon: <FaCommentDots />, label: "Feedback" },
    ],
  };

  const items = role ? navConfig[role] : [];

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "lightgrey" }}>
      <nav
        className="bg-dark text-white d-flex flex-column p-3"
        style={{ width: "250px", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 1000 }}
      >
        <h3 className="text-center mb-4">TrimTime</h3>
        <ul className="list-unstyled">
          {items.length > 0 ? (
            items.map(({ to, icon, label }) => (
              <li className="mb-3" key={to}>
                <Link to={to} className="text-white text-decoration-none d-flex align-items-center">
                  {React.cloneElement(icon, { className: "me-2" })}
                  {label}
                </Link>
              </li>
            ))
          ) : (
            <li className="mb-3 text-warning">No navigation items available</li>
          )}
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
      </nav>

      <main className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <div className="text-end mb-3">
          <FaHome
            size={28}
            color="black"
            style={{ cursor: "pointer" }}
            onClick={() => window.location.href = "http://localhost:5173/"}
            title="Go to Home"
          />
        </div>
        <Outlet />
      </main>

      <LogoutPopup show={showPopup} onConfirm={handleLogout} onCancel={() => setShowPopup(false)} />
    </div>
  );
};

export default DashboardLayout;
