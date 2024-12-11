import React from "react";
import { useParams } from "react-router-dom";

const BarberProfilePage = () => {
  const { name } = useParams();

  const barbers = [
    {
      imgSrc: "https://images.fresha.com/locations/location-profile-images/230783/2100388/4a0972db-82ab-4ced-b1c3-41645e148cfa-KittnSalonSpa-Karnal-IN-Haryana-Karnal-ModelTownOfficersColony-Fresha.jpg?class=venue-gallery-large&dpr=2",
      name: "Barber Name 1",
      location: "Mahendragarh",
      rating: 4.5,
      services: [
        { name: "Haircut", price: 300 },
        { name: "Shaving", price: 150 },
        { name: "Massage", price: 500 },
      ],
      timings: "Mon-Sat: 9:00 AM - 8:00 PM",
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhcmJlcnxlbnwwfHx8fDE2NjU1NTU1MDQ&ixlib=rb-1.2.1&q=80&w=400",
      name: "Barber Name 2",
      location: "Uptown",
      rating: 4.8,
      services: [
        { name: "Haircut", price: 350 },
        { name: "Beard Trim", price: 200 },
        { name: "Head Massage", price: 400 },
      ],
      timings: "Mon-Sun: 10:00 AM - 7:00 PM",
    },
    {
      imgSrc: "https://images.fresha.com/locations/location-profile-images/1180884/2335288/43d9f6ee-5ee7-499c-86c2-34c0b0908566-BrutBarbershop-AE-Dubai-Dubai-AlSufouhDubaiMediaCity-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true",
      name: "Billu Barber",
      location: "Gurgaon",
      rating: 4.9,
      services: [
        { name: "Haircut", price: 400 },
        { name: "Shaving", price: 200 },
        { name: "Facial", price: 600 },
      ],
      timings: "Mon-Fri: 8:00 AM - 6:00 PM",
    },
  ];

  const barber = barbers.find((b) => b.name === name);

  if (!barber) {
    return <p>Barber not found</p>;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-6 mx-auto text-center">
          <img src={barber.imgSrc} alt={barber.name} className="img-fluid" />
          <h3>{barber.name}</h3>
          <p>{barber.location}</p>
          <p>Rating: {barber.rating}/5</p>
          <h4>Services</h4>
          <ul>
            {barber.services.map((service, index) => (
              <li key={index}>
                {service.name} - ₹{service.price}
              </li>
            ))}
          </ul>
          <p>Timing: {barber.timings}</p>
          <button className="btn btn-primary">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default BarberProfilePage;
