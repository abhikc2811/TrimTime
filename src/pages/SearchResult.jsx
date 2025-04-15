import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import BarberCard from "../components/BarberCard";
import { barbers } from "../components/Recommendation";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [barbersFromDb, setBarbersFromDb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/barbers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch barbers");
        }
        return response.json();
      })
      .then((data) => {
        setBarbersFromDb(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const combinedBarbers = [...barbers, ...barbersFromDb];

  const filteredBarbers = searchQuery
    ? combinedBarbers.filter((barber) =>
        barber.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : combinedBarbers;

  if (loading) return <p>Loading barbers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="pb-2">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Search Results"}
        </h2>
        <div className="row g-4">
          {filteredBarbers.length > 0 ? (
            filteredBarbers.map((barber, index) => (
              <BarberCard
                key={index}
                imgSrc={barber.imgSrc || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
                barberShopName={barber.barberShopName}
                location={barber.location}
                rating={barber.rating || 0}
                services={barber.services}
              />
            ))
          ) : (
            <p>No barbers found matching your search.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
