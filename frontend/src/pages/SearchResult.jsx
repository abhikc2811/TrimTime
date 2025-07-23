import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import BarberCard from "../components/BarberCard";
import { useCustomerStore } from "../store/useCustomerStore";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const { barbers, loading, error, search } = useCustomerStore();

  useEffect(() => {
    search(searchQuery);
  }, [searchQuery]);

  if (loading) return <p>Loading barbers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="pb-2">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "All Barbers"}
        </h2>
        <div className="row g-4">
          {barbers.length > 0 ? (
            barbers.map((barber, index) => (
              <BarberCard
                key={index}
                imgSrc={
                  barber.shopImage || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                shopName={barber.shopName}
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
