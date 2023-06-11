import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import { getHotelById, updateHotel } from "../../api/internal";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import hotelSchema from "../../schemas/hotelSchema";

const UpdateHotel = () => {
  const navigate = useNavigate();
  const params = useParams();

  //   const logedInUserId = useSelector((state) => state.user._id);
  const author = useSelector((state) => state.user._id);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const hotelId = params.id;
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    const getHotelDetails = async () => {
      const hotelResponse = await getHotelById(hotelId);
      console.log(hotelResponse);

      if (hotelResponse.status === 200) {
        setHotel(hotelResponse.data.hotel);

        setLoading(false);

        // console.log(
        //   `${hotelResponse.data.hotel.author.userId} === ${logedInUserId}`
        // );
        // console.log(hotelResponse.data.hotel.author.userId === logedInUserId);
      } else if (hotelResponse.code === "ERR_BAD_REQUEST") {
        // display error message
        setError(hotelResponse.response.data.message);
        setLoading(false);
      } else {
        // display error message
        setError(hotelResponse.message);
        setLoading(false);
      }
    };

    getHotelDetails();
  }, []);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        // console.log(`onload result :`);
        // console.log(result);
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleUpdate = async () => {
    // console.log(values);
    // console.log(fileDataURL);
    const data = {
      name: values.name,
      city: values.city,
      address: values.address,
      location: values.location,
      province: values.province,
      country: values.country,
      description: values.description,
      totalRooms: values.totalRooms,
      photo: fileDataURL,
      author,
      hotelId: hotel._id,
    };

    console.log(`calling update hotel API`);
    console.log(data);
    const response = await updateHotel(data);

    console.log(response);

    // HTTP 204 should imply "resource updated successfully"
    if (response.status === 204) {
      //redirect to Home Page
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    } else {
      // display error message
      setError(response.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: hotel?.name,
      address: hotel?.address,
      city: hotel?.city,
      location: hotel?.location,
      province: hotel?.province,
      country: hotel?.country,
      description: hotel?.description,
      totalRooms: hotel?.totalRooms,
    },
    enableReinitialize: true,
    validationSchema: hotelSchema,
  });

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
    <div className="hotelDataWrapper">
      <div className="hotelDataHeader">Add New Hotel</div>

      <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        type="text"
        name="city"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="city"
        error={errors.city && touched.city ? 1 : undefined}
        errormessage={errors.city}
      />

      <TextInput
        type="text"
        name="address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="address"
        error={errors.address && touched.address ? 1 : undefined}
        errormessage={errors.address}
      />

      <TextInput
        type="text"
        name="location"
        value={values.location}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="location"
        error={errors.location && touched.location ? 1 : undefined}
        errormessage={errors.location}
      />

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Select
          aria-label="Default select example"
          name="province"
          value={values.province}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Province</option>
          <option value="punjab">Punjab</option>
          <option value="sindh">Sindh</option>
          <option value="kpk">KPK</option>
        </Form.Select>
        {errors.province && touched.province && (
          <p className="errorMessage">{errors.province}</p>
        )}
      </Form.Group>

      {/* <TextInput
        type="text"
        name="province"
        value={values.province}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="province"
        error={errors.province && touched.province ? 1 : undefined}
        errormessage={errors.province}
      /> */}

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Select
          aria-label="Default select example"
          name="country"
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option>Country</option>
          <option value="pakistan">Pakistan</option>
          <option value="India">India</option>
          <option value="dubai">Dubai</option>
        </Form.Select>
        {errors.country && touched.country && (
          <p className="errorMessage">{errors.country}</p>
        )}
      </Form.Group>

      {/* <TextInput
        type="text"
        name="country"
        value={values.country}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="country"
        error={errors.country && touched.country ? 1 : undefined}
        errormessage={errors.country}
      /> */}

      <TextInput
        type="text"
        name="totalRooms"
        value={values.totalRooms}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Total Rooms"
        error={errors.totalRooms && touched.totalRooms ? 1 : undefined}
        errormessage={errors.totalRooms}
      />

      <TextInput
        as="textarea"
        rows={3}
        name="description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Description"
        error={errors.description && touched.description ? 1 : undefined}
        errormessage={errors.description}
      />

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={changeHandler}
        />
      </Form.Group>

      {/* <p>
        <label htmlFor="file">Upload images</label>
        <input
          type="file"
          id="file"
          onChange={changeHandler}
          accept="image/*"
          multiple
        />
      </p> */}

      {/* <p>
        <label htmlFor="image"> Browse images </label>
        <input
          type="file"
          id="image"
          accept=".png, .jpg, .jpeg"
          onChange={changeHandler}
        />
      </p> */}

      {fileDataURL ? (
        <p className="img-preview-wrapper">
          {<img src={fileDataURL} alt="preview" />}
        </p>
      ) : null}

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleUpdate}>
          Submit Hotel
        </Button>
      </div>

      {error !== "" ? <p className="errorMessage">{error}</p> : ""}
    </div>
  );
};

export default UpdateHotel;
