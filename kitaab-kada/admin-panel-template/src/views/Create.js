import React, { useState } from "react";
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

import axios from "axios";

function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("all");
  const [stock, setStock] = useState(0);

  //bootstrap toast
  const [showToast, setShowToast] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  // const [isError, setIsError] = useState(false);

  const history = useHistory();
  const navigateToList = (route) => history.push(route);

  //handle create logic
  const handleCreate = async (e) => {
    e.preventDefault();
    // console.log(image);
    // console.log(title);

    // try {
    //   const response = await axios.post(
    //     `http://localhost:4000/api/v1/admin/book/new`,
    //     {
    //       title,
    //       author,
    //       description,
    //       price,
    //       category,
    //       stock,
    //     }
    //   );
    //   console.log("Response:", response);
    // } catch (error) {
    //   console.log("Error ---> ", e);
    // }

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
      .post(`http://localhost:4000/api/v1/admin/book/new`, formData, config)
      .then((response) => {
        console.log("Response:", response);
        navigateToList("/admin/table");
        // console.log(response.data.success);
      })
      .catch((e) => {
        // const isCreated = e.response.data.success;
        // setIsError(e.response.data.success);
        console.log("Error ---> ", e);
        setToastErrorMessage(e.response.data.message);
        setShowToast(true);
      });
  };

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
                <Card.Title as="h4">Add New Book</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={(e) => handleCreate(e)}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Title</label>
                        <Form.Control
                          onChange={(e) => setTitle(e.target.value)}
                          defaultValue={title}
                          placeholder="Enter Title"
                          type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Author</label>
                        <Form.Control
                          onChange={(e) => setAuthor(e.target.value)}
                          defaultValue={author}
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
                          onChange={(e) => setPrice(e.target.value)}
                          defaultValue={price}
                          placeholder="Price"
                          type="number"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Stock</label>
                        <Form.Control
                          onChange={(e) => setStock(e.target.value)}
                          defaultValue={stock}
                          placeholder="Stock"
                          type="number"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          onChange={(e) => setDescription(e.target.value)}
                          as={"textarea"}
                          defaultValue={description}
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
                          defaultValue={image}
                          type="file"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col style={{ margin: "auto" }}>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">Category</option>
                        <option value="novel">Novel</option>
                        <option value="health">Health</option>
                        <option value="business">Business</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    style={{ marginTop: "10px" }}>
                    Create Book
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

export default Create;
