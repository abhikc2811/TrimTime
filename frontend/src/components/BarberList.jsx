import { useEffect, useState } from "react";
import BarberCard from "./BarberCard";

const BarberList = () => {
  const [barbers, setBarbers] = useState([]);

  // Fetch barbers from db.json
  useEffect(() => {
    fetch("http://localhost:3001/barbers") // Adjust the URL if necessary
      .then((response) => response.json())
      .then((data) => setBarbers(data))
      .catch((error) => console.error("Error fetching barbers:", error));
  }, []);

  return (
    <div className="row">
      {barbers.map((barber) => (
        <BarberCard
          key={barber.id}
          imgSrc={barber.shopImage}
          shopName={barber.shopName}
          location={barber.location}
          services={barber.services}
          rating={barber.rating || 0} 
        />
      ))}
    </div>
  );
};

export default BarberList;
