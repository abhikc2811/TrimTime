import { Link } from "react-router-dom";

const BarberCard = ({ imgSrc, name, location, rating }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <Link to={`/barber/${encodeURIComponent(name)}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card">
        <img
          src={imgSrc}
          className="card-img-top barber-img"
          alt={`${name}'s Image`}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Location: {location}</p>
          <p className="card-text">Rating: {rating}/5</p>
          <a href="#" className="btn btn-primary">
            Book Appointment
          </a>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default BarberCard;
