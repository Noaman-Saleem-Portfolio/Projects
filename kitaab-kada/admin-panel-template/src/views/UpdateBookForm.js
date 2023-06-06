import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // version 5.2.0

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

function UpdateBookForm() {
  const [book, setBook] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  //bootstrap toast
  const [showToast, setShowToast] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");

  const history = useHistory();

  // navigate to List page
  const navigateToList = (route, msg) =>
    history.push({
      pathname: route,
      state: { message: msg },
    });

  const params = useParams();
  // console.log(params.id);

  //handleUpdate
  const handleUpdate = async (e) => {
    // console.log("handle");
    e.preventDefault();
    // const updatedObject = {
    //   title,
    //   author,
    //   description,
    //   image,
    //   price,
    //   category,
    //   stock,
    // };
    // console.log(updatedObject);

    let formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("image", image);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    console.log("FormData: ", formData.get("image"));

    axios
      .put(
        `http://localhost:4000/api/v1/admin/book/${params.id}`,
        formData,
        config
      )
      .then((response) => {
        console.log("Response:", response);
        navigateToList("/admin/table", response.data.message);
      })
      .catch((e) => {
        console.log("Error ---> ", e);
        setToastErrorMessage(e.response.data.message);
        setShowToast(true);
      });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/v1/admin/book/${params.id}`
      );
      const { book } = response.data;
      setBook(book);
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setPrice(book.price);
      setCategory(book.category);
      setImage(book.image);
      setStock(book.stock);
    };
    fetchBooks();
  }, []);
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
                  bg="danger"
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
            <Card>
              <Card.Header>
                <Card.Title as="h4">Update Book Info</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e) => handleUpdate(e)}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Title</label>
                        <Form.Control
                          onInput={(e) => {
                            setTitle(e.target.value);
                            // console.log(title);
                          }}
                          defaultValue={book.title}
                          placeholder="Enter Title"
                          type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Author</label>
                        <Form.Control
                          onInput={(e) => setAuthor(e.target.value)}
                          defaultValue={book.author}
                          placeholder="Author Name"
                          type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          onInput={(e) => setPrice(e.target.value)}
                          defaultValue={book.price}
                          placeholder="Price"
                          type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Stock</label>
                        <Form.Control
                          onInput={(e) => setStock(e.target.value)}
                          defaultValue={book.stock}
                          placeholder="Stock"
                          type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          onInput={(e) => setDescription(e.target.value)}
                          as={"textarea"}
                          defaultValue={book.description}
                          placeholder="Add Description ........"
                          type="text"></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Image</label>
                        <Form.Control
                          onChange={(e) => {
                            console.log(e.target.files);
                            setImage(e.target.files[0]);
                          }}
                          defaultValue={book.image}
                          type="file"></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col style={{ margin: "auto" }}>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setCategory(e.target.value)}>
                        <option
                          selected={category === "all" ? "selected" : ""}
                          value="all">
                          Category
                        </option>
                        <option
                          selected={category === "novel" ? "selected" : ""}
                          value="novel">
                          Novel
                        </option>
                        <option
                          selected={category === "health" ? "selected" : ""}
                          value="health">
                          Health
                        </option>
                        <option
                          selected={category === "business" ? "selected" : ""}
                          value="business">
                          Business
                        </option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    style={{ marginTop: "10px" }}>
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateBookForm;
