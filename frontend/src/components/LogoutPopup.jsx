import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const LogoutPopup = ({ show, onConfirm, onCancel }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleConfirm = () => {
    setIsLoggedOut(true);
    setTimeout(() => onConfirm(), 2000); 
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "30px 40px",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isLoggedOut ? (
          <>
            <FaCheckCircle size={50} color="green" />
            <h3 style={{ marginTop: "20px" }}>You are successfully logged out</h3>
          </>
        ) : (
          <>
            <h3>Logout Confirmation</h3>
            <p style={{ marginTop: "12px", marginBottom: "25px" }}>
              Are you sure you want to log out?
            </p>
            <div style={{ display: "flex", marginBottom: "12px", justifyContent: "space-evenly" }}>
              <button
                onClick={handleConfirm}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 30px",
                  cursor: "pointer",
                }}
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                style={{
                  backgroundColor: "transparent",
                  color: "#007bff",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  padding: "10px 30px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoutPopup;
