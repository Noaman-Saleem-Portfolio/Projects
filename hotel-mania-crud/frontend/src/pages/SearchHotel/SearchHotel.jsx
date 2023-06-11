import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { getAllHotels } from "../../api/internal";
import "./SearchHotel.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const SearchHotel = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllHotelsApiCall = async () => {
      const response = await getAllHotels();

      console.log(response);

      if (response.status === 200) {
        setHotels(response.data.hotels);
        setLoading(false);
      } else if (response.code === "ERR_BAD_REQUEST") {
        // display error message
        setError(response.response.data.message);
        setLoading(false);
      } else {
        // display error message
        setError(response.message);
        setLoading(false);
      }
    };

    getAllHotelsApiCall();

    return setHotels([]);
  }, []);

  const handleClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  if (loading) {
    return <Loader text="Hotels" />;
  }

  if (hotels.length === 0) {
    return (
      <Container>
        <h5>Zero Hotel available to display</h5>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          {hotels.map((hotel) => (
            <Col
              md={12}
              onClick={() => handleClick(hotel._id)}
              style={{ cursor: "pointer" }}
            >
              {/* <img
                src={`${process.env.REACT_APP_INTERNAL_API_PATH}/${hotel.photoPath}`}
                alt="Hotel "
              /> */}
              <Image
                className="searhResultHotelImage"
                src={`${process.env.REACT_APP_INTERNAL_API_PATH}/${hotel.photoPath}`}
                alt="Hotel "
                fluid
                rounded
              />
              <h4>{hotel.name}</h4>
              <p>{hotel.description}</p>
              <hr />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SearchHotel;
