import React, { useState } from "react";  // Import useState from React
import { useAuth } from '../context/AuthContext';

const MyAppointments = () => {
  const [appointments, getAppointments] = useState([
    {
      id: 1,
      barberShopName: "John Doe",
      date: "2024-12-02",
      timeSlot: "10:00 AM",
      services: ["Haircut", "Massage"],
    }
  ]);
  
  const handleCancel = (id) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    getAppointments(updatedAppointments);
  };

  return (
    <div className="container mt-4">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center text-danger">No appointments available.</p>
      ) : (
        <table className="table table-hover shadow-sm rounded">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Barber Name</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Services</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.barberShopName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.services.join(', ')}</td> {/* Join the services array */}
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
