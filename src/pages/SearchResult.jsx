import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Recommendation from "../components/Recommendation";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  return (
    <>
      <Navbar />
      <div>
        <Recommendation searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default SearchResults;
