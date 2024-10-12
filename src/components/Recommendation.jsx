import BarberCard from './BarberCard';

const Recommendation = () => {
  const barbers = [
    {
      imgSrc: 'https://images.fresha.com/locations/location-profile-images/230783/2100388/4a0972db-82ab-4ced-b1c3-41645e148cfa-KittnSalonSpa-Karnal-IN-Haryana-Karnal-ModelTownOfficersColony-Fresha.jpg?class=venue-gallery-large&dpr=2',
      name: 'Barber Name 1',
      location: 'Downtown',
      rating: 4.5,
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhcmJlcnxlbnwwfHx8fDE2NjU1NTU1MDQ&ixlib=rb-1.2.1&q=80&w=400',
      name: 'Barber Name 2',
      location: 'Uptown',
      rating: 4.8,
    },
  ];

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
              name={barber.name} 
              location={barber.location} 
              rating={barber.rating} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
