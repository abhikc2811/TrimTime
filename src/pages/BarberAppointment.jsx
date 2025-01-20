import React, { useState } from "react";

const BarberAppointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customerName: "John Doe",
      date: "2024-12-02",
      timeSlot: "10:00 AM - 10:30 AM",
      age: 28,
      mobile: "123-456-7890",
    }
  ]);

  const handleCancel = (id) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(updatedAppointments);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Appointments Received</h2>
      {appointments.length === 0 ? (
        <p className="text-center text-danger">No appointments available.</p>
      ) : (
        <table className="table table-hover shadow-sm rounded">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Age</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.customerName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.age}</td>
                <td>{appointment.mobile}</td>
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

export default BarberAppointment;
