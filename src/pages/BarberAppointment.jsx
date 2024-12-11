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
    },
    {
      id: 2,
      customerName: "Jane Smith",
      date: "2024-12-02",
      timeSlot: "11:00 AM - 11:30 AM",
      age: 32,
      mobile: "234-567-8901",
    },
    {
      id: 3,
      customerName: "Sam Wilson",
      date: "2024-12-02",
      timeSlot: "01:00 PM - 01:30 PM",
      age: 25,
      mobile: "345-678-9012",
    },
    {
      id: 4,
      customerName: "Emily Brown",
      date: "2024-12-03",
      timeSlot: "09:30 AM - 10:00 AM",
      age: 40,
      mobile: "456-789-0123",
    },
    {
      id: 5,
      customerName: "Michael Johnson",
      date: "2024-12-03",
      timeSlot: "12:00 PM - 12:30 PM",
      age: 35,
      mobile: "567-890-1234",
    },
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
