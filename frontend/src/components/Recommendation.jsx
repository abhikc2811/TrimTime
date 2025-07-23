import BarberCard from "./BarberCard";

export const barbers = [
  {
    imgSrc: "https://images.fresha.com/locations/location-profile-images/230783/2100388/4a0972db-82ab-4ced-b1c3-41645e148cfa-KittnSalonSpa-Karnal-IN-Haryana-Karnal-ModelTownOfficersColony-Fresha.jpg?class=venue-gallery-large&dpr=2",
    shopName: "Barber Name 1",
    location: "Mahendragarh",
    rating: 4.5,
    services: [
      { name: "Haircut", price: 300 },
      { name: "Shaving", price: 150 },
      { name: "Massage", price: 500 },
    ],
  },
  {
    imgSrc: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhcmJlcnxlbnwwfHx8fDE2NjU1NTU1MDQ&ixlib=rb-1.2.1&q=80&w=400",
    shopName: "Barber Name 2",
    location: "Uptown",
    rating: 4.8,
    services: [
      { name: "Haircut", price: 350 },
      { name: "Beard Trim", price: 200 },
      { name: "Head Massage", price: 400 },
    ],
  },
  {
    imgSrc: "https://images.fresha.com/locations/location-profile-images/1180884/2335288/43d9f6ee-5ee7-499c-86c2-34c0b0908566-BrutBarbershop-AE-Dubai-Dubai-AlSufouhDubaiMediaCity-Fresha.jpg?class=gallery-modal-large&dpr=2&watermark=true",
    shopName: "Billu Barber",
    location: "Gurgaon",
    rating: 5,
    services: [
      { name: "Haircut", price: 400 },
      { name: "Shaving", price: 200 },
      { name: "Facial", price: 600 },
    ],
  },
];

const Recommendation = () => {
  return (
    <section id="recommendations" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h2>Recommended Barbers</h2>
          </div>
        </div>
        <div className="row g-4">
          {barbers.map((barber, index) => (
            <BarberCard
              key={index}
              imgSrc={barber.imgSrc}
              shopName={barber.shopName}
              location={barber.location}
              rating={barber.rating || 0}
              services={barber.services}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
