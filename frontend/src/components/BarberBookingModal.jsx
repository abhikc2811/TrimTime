import { useState } from "react";
import RatingStars from "./RatingStars";
import { FaPlus, FaMinus } from "react-icons/fa";

const BarberBookingModal = ({ show, onClose, barber }) => {
  if (!show || !barber) return null;

  const { imgSrc, shopName, rating, location, services } = barber;
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleServiceAdd = (service) => {
    if (!selectedServices.some((s) => s.name === service.name)) {
      setSelectedServices((prev) => [...prev, service]);
      setTotalPrice((prev) => prev + service.price);
    }
  };

  const handleServiceRemove = (service) => {
    setSelectedServices((prev) => prev.filter((s) => s.name !== service.name));
    setTotalPrice((prev) => prev - service.price);
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-hidden="true"
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-lg"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Book Appointment
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex mb-4">
                <img
                  src={imgSrc}
                  alt={shopName}
                  className="rounded-circle me-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  <h5>{shopName}</h5>
                  <p className="mb-1">
                    Rating: {rating} <RatingStars rating={rating} />
                  </p>
                  <p>Location: {location}</p>
                </div>
              </div>

              <h4>Services</h4>
              <ul className="list-group mb-4">
                {services.map((service, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{service.name}</strong>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-3 service-price">₹{service.price}</span>
                      <div className="line-separator"></div>
                      {selectedServices.find((s) => s.name === service.name) ? (
                        <FaMinus
                          className="text-danger action-icon"
                          onClick={() => handleServiceRemove(service)}
                        />
                      ) : (
                        <FaPlus
                          className="text-secondary action-icon"
                          onClick={() => handleServiceAdd(service)}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <h4>Date & Time</h4>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">
                    Select Date
                  </label>
                  <input type="date" id="date" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="time" className="form-label">
                    Select Time Slot
                  </label>
                  <select id="time" className="form-select">
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h5>Total Price: ₹{totalPrice}</h5>
                <button className="btn btn-success">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default BarberBookingModal;
