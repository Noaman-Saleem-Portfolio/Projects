import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//signup
export const signup = async (data) => {
  let response;
  try {
    response = await api.post("/register", data);
  } catch (error) {
    return error;
  }

  return response;
};

//login
export const login = async (data) => {
  let response;
  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }
  return response;
};

//==================================
// Hotels
//==================================

//submit hotel
export const submitHotel = async (data) => {
  let response;

  try {
    response = await api.post("/hotel/new", data);
  } catch (error) {
    return error;
  }

  return response;
};
