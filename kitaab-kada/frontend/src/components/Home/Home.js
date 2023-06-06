import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [title, setTitle] = useState("");

  const searchQuery = () => {
    navigate({
      pathname: "/search",
      search: `?category=${category}&title=${title}`,
    });
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="mt-5">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" style={{}}>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="all">Category</option>
                  <option value="novel">Novel</option>
                  <option value="health">Health</option>
                  <option value="business">Business</option>
                </Form.Select>
              </InputGroup.Text>

              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                aria-label="Text input with dropdown button"
              />
              <Button
                onClick={searchQuery}
                variant="outline-primary"
                id="button-addon2">
                Button
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
