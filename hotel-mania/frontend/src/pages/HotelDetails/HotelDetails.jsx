import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHotelById } from "../../api/internal";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

import "./HotelDetails.css";

const HotelDetails = () => {
  const navigate = useNavigate();
  const logedInUserId = useSelector((state) => state.user._id);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();
  const hotelId = params.id;

  useEffect(() => {
    const getHotelDetails = async () => {
      const blogResponse = await getHotelById(hotelId);
      console.log(blogResponse);

      if (blogResponse.status === 200) {
        setHotel(blogResponse.data.hotel);
        setLoading(false);

        // console.log(
        //   `${blogResponse.data.hotel.author.userId} === ${logedInUserId}`
        // );
        // console.log(blogResponse.data.hotel.author.userId === logedInUserId);
      } else if (blogResponse.code === "ERR_BAD_REQUEST") {
        // display error message
        setError(blogResponse.response.data.message);
        setLoading(false);
      } else {
        // display error message
        setError(blogResponse.message);
        setLoading(false);
      }
    };

    getHotelDetails();
  }, []);

  const goToUpdate = () => {
    navigate(`/hotel-update/${hotel._id}`);
  };

  if (loading) {
    return <Loader text="Hotel" />;
  }

  if (error) {
    return (
      <Container>
        <h4>{error}</h4>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
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
            {hotel.author.userId === logedInUserId ? (
              <Button variant="warning" onClick={goToUpdate}>
                Update
              </Button>
            ) : (
              ""
            )}
            <hr />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HotelDetails;
