import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(Object.fromEntries([...searchParams]));
  console.log(location.state);
  return (
    <>
      <Link to={"/home"}>Home</Link>
      <br></br>
      {/* <Link to={"/search-result"}>Search Result</Link> */}
      <div>SearchResult</div>
    </>
  );
};

export default SearchResult;
