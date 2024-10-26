const HeroSection = () => {
    return (
      <section className="hero bg-dark text-center p-5">
        <h1 className=" display-4">Find the Best Barber Near You</h1>
        <p className="lead">Book appointments easily with trusted barbers in your area.</p>
        <div className="search-bar mt-4">
          <input type="text" className="form-control search" placeholder="Search for barbers, services, or locations" aria-label="Search" />
          <button className="btn btn-primary mt-3">Search</button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  