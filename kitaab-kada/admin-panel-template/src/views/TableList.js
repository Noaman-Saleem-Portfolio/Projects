import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom"; // version 5.2.0

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function TableList() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [booksCount, setBooksCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);

  //bootstrap toast
  const [showToast, setShowToast] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  // navigate To Update Route
  const history = useHistory();
  const navigateToUpdateRoute = (route) => history.push(route);

  const location = useLocation();
  // if (location.state.message) {
  //   console.log(location.state.message);
  // }

  const renderUpdate = (e, route) => {
    navigateToUpdateRoute(route);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/v1/admin/books"
      );
      // console.log(response.data);
      setBooks(response.data.books);
      setIsLoading(false);
      setBooksCount(response.data.booksCount);

      //Incase Error occurs in backend
      if (response.data.success === false) {
        setIsLoading(false);
        setIsError(true);
        setToastErrorMessage(response.data.message);
      }

      //check if we are rerouting from the updatebook component
      if (location.state.message) {
        // console.log(location.state.message);
        setToastErrorMessage(location.state.message);
        setToastColor("success");
        setShowToast(true);
        location.state.message = "";
      }
    };
    fetchBooks();
  }, [isDeleted]);

  //Handle Delete
  const handleDelete = async (e) => {
    // console.log(e.currentTarget.id);
    const response = await axios.delete(
      `http://localhost:4000/api/v1/admin/book/${e.currentTarget.id}`
    );
    console.log(response.data.message);
    setToastErrorMessage(response.data.message);
    setToastColor("success");
    setShowToast(true);
    //ensuring that books has been successfully deleted from DB
    setIsDeleted(!isDeleted);

    // console.log(isDeleted);
  };

  if (isLoading) {
    return <h1>Loading ........</h1>;
  }

  if (isError) {
    return <h4>{errorMessage}</h4>;
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <div
              aria-live="polite"
              aria-atomic="true"
              className=" position-absolute"
              style={{
                minHeight: "100px",
                zIndex: "999",
                width: "800px",
                // opacity: "0.9",
              }}>
              <ToastContainer position="bottom-end" className="p-3">
                <Toast
                  onClose={() => setShowToast(false)}
                  bg={`${toastColor} text-white`}
                  show={showToast}
                  delay={3000}
                  autohide>
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Message</strong>
                    {/* <small>11 mins ago</small> */}
                  </Toast.Header>
                  <Toast.Body className="text-white">
                    {toastErrorMessage}
                  </Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
            {/* Toast Div */}
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List of Books</Card.Title>
                <p className="card-category">
                  You have currentrly {booksCount} books in your database.
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {Object.keys(books[0]).map((c, index) => {
                        //Eliminate _id as column name
                        if (c === "_id") {
                          return (
                            <th key={index} className="border-0">
                              Serial No
                            </th>
                          );
                        } else {
                          return (
                            <th key={index} className="border-0">
                              {c === "price" ? "$ " + c : c}
                            </th>
                          );
                        }
                      })}
                      <th className="border-0">Update</th>
                      <th className="border-0">Delete</th>
                      <th className="border-0">Image</th>
                      {/* <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((b, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{b.title}</td>

                          <td>
                            {b.description.slice(0, 15) +
                              (b.description.length > 15 ? "..." : "")}
                          </td>

                          <td>{b.price}</td>

                          <td>{b.category ? b.category : "Not-set"}</td>

                          <td>{b.stock}</td>

                          <td>
                            <Button
                              id={b._id}
                              onClick={(e) =>
                                renderUpdate(e, `/admin/book/${b._id}`)
                              }
                              variant="success"
                              size="sm">
                              Update
                            </Button>
                          </td>
                          <td>
                            <Button
                              id={b._id}
                              onClick={(e) => handleDelete(e)}
                              variant="danger"
                              size="sm">
                              Delete
                            </Button>
                          </td>

                          <td>
                            {" "}
                            <img
                              style={{
                                width: "100%",
                                height: "50px",
                                marginBottom: "10px",
                              }}
                              src={`http://localhost:4000/static/images/books/${b.image}`}
                              alt="...book image"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
