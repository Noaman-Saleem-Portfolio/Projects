import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { submitHotel } from "../../api/internal";
import TextInput from "../../components/TextInput/TextInput";
import hotelSchema from "../../schemas/hotelSchema";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./AddHotel.css";

const AddHotel = () => {
  const author = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  // const changeHandler = (e) => {
  //   const { files } = e.target;
  //   // console.log(`files :`);
  //   // console.log(files);
  //   for (let i = 0; i < files.length; i++) {
  //     // console.log(files[i]);
  //     const file = files[i]; // OR const file = files.item(i);
  //   }
  // };

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

  const handleSubmit = async () => {
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
    };

    console.log(`calling create hotel API`);
    const response = await submitHotel(data);

    console.log(response);

    if (response.status === 201) {
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
      name: "",
      city: "",
      address: "",
      location: "",
      province: "",
      country: "",
      description: "",
      totalRooms: "",
    },

    validationSchema: hotelSchema,
  });
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
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Submit Hotel
        </Button>
      </div>

      {error !== "" ? <p className="errorMessage">{error}</p> : ""}
    </div>
  );
};

export default AddHotel;
