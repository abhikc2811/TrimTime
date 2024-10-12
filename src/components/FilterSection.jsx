const FilterSection = () => {
    return (
      <section id="filter-section" className="py-5 bg-white">
        <div className="container">
          <div className="row text-center">
            <h2>Filter by</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <select className="form-select" aria-label="Filter by Location">
                <option selected>Location</option>
                <option value="1">Downtown</option>
                <option value="2">Uptown</option>
                <option value="3">Suburbs</option>
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" aria-label="Filter by Type of Services">
                <option selected>Type of Service</option>
                <option value="1">Haircut</option>
                <option value="2">Shaving</option>
                <option value="3">Face Massage</option>
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" aria-label="Filter by Age">
                <option selected>Category by Age</option>
                <option value="1">Kids</option>
                <option value="2">Adults</option>
                <option value="3">Seniors</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default FilterSection;
  