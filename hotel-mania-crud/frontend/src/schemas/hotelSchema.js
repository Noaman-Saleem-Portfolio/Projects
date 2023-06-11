import * as yup from "yup";

const errorMessage = "use lowercase, uppercase and digits";

const hotelSchema = yup.object().shape({
  name: yup.string().max(100).required("Name is required"),
  city: yup.string().max(30).required("City is required"),
  address: yup.string().max(500).required("Address is required"),
  location: yup.string().max(500).required("Location is required"),
  province: yup.string().required("Province is required"),
  country: yup.string().max(30).required("Country is required"),
  description: yup.string().max(1000).required(),
  totalRooms: yup.string().required(),
});

export default hotelSchema;
