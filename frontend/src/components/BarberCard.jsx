import { useState } from "react";
import RatingStars from "./RatingStars";
import BarberBookingModal from "./BarberBookingModal";

const BarberCard = ({ imgSrc, barberShopName, location, services, rating }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="col-lg-4 col-md-6">
      <div className="card">
        <img
          src={imgSrc}
          className="card-img-top barber-img"
          alt={`${barberShopName}'s Image`}
        />
        <div className="card-body">
          <h5 className="card-title">{barberShopName}</h5>
          <p className="card-text">Location: {location}</p>
          <p className="card-text">
            Rating: {rating} <RatingStars rating={rating} />
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {showModal && (
        <BarberBookingModal
          show={showModal}
          onClose={() => setShowModal(false)}
          barber={{ imgSrc, barberShopName, location, rating, services }}
        />
      )}
    </div>
  );
};

export default BarberCard;
