import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux Store
import { fetchBooks, STATUSES } from "../../redux/slices/booksSlice";

//Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "../Pagination/Pagination";

const Results = () => {
  const dispatch = useDispatch();

  const {
    data: books,
    status,
    queryFields,
    response,
    page,
    pages,
  } = useSelector((state) => state.books);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchBooks());
      } catch (error) {
        console.log("OH NO ERROR");
        console.log(error);
      }
    };
    fetchData();
  }, [queryFields, page, pages]);

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // console.log(response.data.booksCount);

  return (
    <>
      <Pagination />
      <div className="book-search-results">
        <div className="header">
          <h2>
            Search Results{" "}
            {response.booksCount || response.booksCount === 0 ? (
              <span style={{ fontSize: "12px" }}>
                found Total{" "}
                <span style={{ color: "red" }}>{response.booksCount}</span>{" "}
                books
              </span>
            ) : (
              "nomi"
            )}{" "}
          </h2>
          <hr />
        </div>
        <div className="book-cards">
          <Row>
            {books.map((item, index) => {
              return (
                <Col key={index} sm={4}>
                  <div className="book-card">
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        marginBottom: "10px",
                      }}
                      src={`http://localhost:4000/static/images/books/${item.image}`}
                      alt="Here will come image"
                    />
                    <h6>{item.title}</h6>
                    <h6>
                      <span className="by">by</span> {item.author}
                    </h6>
                    <p className="price">
                      <span className="dollar">$</span>
                      {item.price}
                    </p>
                    <p className="catagory">Category : {item.category}</p>
                    <button>Add To Cart</button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Results;
