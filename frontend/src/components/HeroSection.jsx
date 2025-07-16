import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="hero bg-dark text-center p-5">
      <h1 className="display-4">Find the Best Barber Near You</h1>
      <p className="lead">Book appointments easily with trusted barbers in your area.</p>
      <form
        className="search-bar mt-4 mx-auto d-flex"
        style={{ width: "50%" }}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control search"
          placeholder="Search for barbers, services, or locations"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary ms-2" type="submit">
          Search
        </button>
      </form>
    </section>
  );
};

export default HeroSection;
