import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQueryFields } from "../../redux/slices/booksSlice";

//Redux Store

//Search Page components
import FilterOptions from "./FilterOptions";
import Results from "./Results";

//Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./searchResult.css";

const SearchResult = () => {
  const dispatch = useDispatch();

  //Converting search params into an object
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState(
    Object.fromEntries([...searchParams])
  );

  // console.log(searchParams.get("title"));
  // console.log(searchParams.get("category"));

  // console.log({ ...filterParams });
  dispatch(setQueryFields({ ...filterParams }));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch(setStatus(STATUSES.LOADING));
  //     try {
  //       let response = await axios.get(
  //         `http://localhost:4000/api/v1/books?category=${filterParams.category}&title=${filterParams.title}`
  //       );
  //       console.log(response.data);

  //       dispatch(setBooks(response.data.books));
  //       dispatch(setStatus(STATUSES.IDLE));
  //     } catch (error) {
  //       console.log("OH NO ERROR");
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Container className="search-result">
        <Row>
          <Col md={4}>
            {/* Sidebar Section */}
            <FilterOptions></FilterOptions>
          </Col>
          <Col md={8} style={{ borderLeft: "1px solid #c8c9ca" }}>
            {/* Search Result Section */}
            <Results filterParams={filterParams}></Results>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchResult;
