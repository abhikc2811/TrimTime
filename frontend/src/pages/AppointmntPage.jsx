import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useAppointmentStore } from "../store/useAppointmentStore";

const AppointmentPage = () => {
  const role = useAuthStore((state) => state.role);
  const { appointments, getAppointments, loading, error } = useAppointmentStore();

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  const handleCancel = (id) => {
    console.log("Cancel requested for ID:", id);
  };

  const handleStatusChange = (id, newStatus) => {
    console.log("Status update:", id, newStatus);
    // TODO: implement updateAppointmentStatus(id, newStatus)
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">
        {role === "barber" ? "Appointments Received" : "My Appointments"}
      </h2>

      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-danger">No appointments available.</p>
      ) : (
        <table className="table table-hover shadow-sm rounded">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              {role === "barber" ? (
                <>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Services</th>
                  <th>Email</th>
                  <th>Status</th>
                </>
              ) : (
                <>
                  <th>Barber Name</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Services</th>
                  <th>Status</th>
                </>
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => (
              <tr key={a._id || index}>
                <td>{index + 1}</td>
                {role === "barber" ? (
                  <>
                    <td>{a.customer?.name || "N/A"}</td>
                    <td>{formatDate(a.appointmentDate)}</td>
                    <td>{a.appointmentTime}</td>
                    <td>{a.services.map((s) => s.name).join(", ")}</td>
                    <td>{a.customer?.email || "N/A"}</td>
                    <td>
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusChange(a._id, e.target.value)}
                        className="form-select form-select-sm"
                      >
                        <option value="booked">Booked</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{a.barber?.shopName || "N/A"}</td>
                    <td>{formatDate(a.appointmentDate)}</td>
                    <td>{a.appointmentTime}</td>
                    <td>{a.services.map((s) => s.name).join(", ")}</td>
                    <td>{a.status}</td>
                  </>
                )}
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(a._id || index)}
                    disabled
                    title="Cancel functionality not implemented yet"
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

export default AppointmentPage;
