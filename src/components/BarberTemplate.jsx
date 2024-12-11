import React from "react";

const BarberTemplate = ({ imgSrc, name, location, services }) => {
  return (
    <div className="col-lg-6 col-md-8 mx-auto">
      <div className="card shadow-sm border-0">
        <img
          src={imgSrc}
          className="card-img-top rounded-top"
          alt={`${name}'s profile`}
        />
        <div className="card-body">
          <h4 className="card-title text-center">{name}</h4>
          <p className="card-text text-muted text-center">
            Location: {location}
          </p>
          <hr />
          <div>
            <h5>Services</h5>
            <ul className="list-unstyled">
              {services.map((service, index) => (
                <li key={index} className="d-flex justify-content-between">
                  <span>{service.name}</span>
                  <span className="text-muted">₹{service.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-grid gap-2 mt-4">
            <a href="#" className="btn btn-primary">
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberTemplate;
