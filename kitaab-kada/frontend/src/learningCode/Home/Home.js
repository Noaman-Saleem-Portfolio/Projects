import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const goToPosts = () => {
    console.log("In Navigate");
    navigate({
      pathname: "/search-result",
      search: "?category=novels&genre=comic",
    });
  };
  return (
    <>
      <Link to={"/home"}>Home</Link>
      <br></br>
      <Link to={"/search-result"} state={{ testing: 123 }}>
        Search
      </Link>
      <br></br>
      <div>Home</div>
      <button onClick={goToPosts}>Go to Posts</button>
    </>
  );
};

export default Home;
