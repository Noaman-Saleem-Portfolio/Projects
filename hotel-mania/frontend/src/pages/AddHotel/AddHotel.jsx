import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { signup } from "../../api/auth";
import TextInput from "../../components/TextInput/TextInput";
import hotelSchema from "../../schemas/hotelSchema";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./AddHotel.css";

const AddHotel = () => {
  const handleSubmit = () => {
    console.log(values);
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
      totalRooms: 0,
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
        type="number"
        name="totalRooms"
        value={values.totalRooms}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="totalRooms"
        error={errors.totalRooms && touched.totalRooms ? 1 : undefined}
        errormessage={errors.totalRooms}
      />

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Select Multiple Images</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Submit Hotel
        </Button>
      </div>
    </div>
  );
};

export default AddHotel;
