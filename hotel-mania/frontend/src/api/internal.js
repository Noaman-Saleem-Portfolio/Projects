import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//logout
export const signout = async () => {
  let response;
  try {
    response = await api.post("/logout");
  } catch (error) {
    return error;
  }
  return response;
};

// //==================================
// // Hotels
// //==================================

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

// get all hotels
export const getAllHotels = async (limit, page) => {
  let response;

  let queryString = `/hotel/all?`;

  if (limit) {
    queryString = queryString + `limit=${limit}`;
  }

  if (page) {
    queryString = queryString + `&page=${page}`;
  }

  console.log(queryString);
  try {
    response = await api.get(queryString);
  } catch (error) {
    return error;
  }

  return response;
};

// get hotel by Id
export const getHotelById = async (id) => {
  let response;

  try {
    response = await api.get(`/hotel/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

// update hotel by Id
export const updateHotel = async (data) => {
  let response;

  try {
    response = await api.put(`/hotel`, data);
  } catch (error) {
    return error;
  }

  return response;
};

// delete hotel
export const deleteHotel = async (id) => {
  let response;

  try {
    response = await api.delete(`/hotel/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

// auto token refresh
// /protected-resource -> 401
// /refresh -> authenthicated state
// /protected-resource

api.interceptors.response.use(
  (config) => {
    // console.log(`I am interceptor: ${config}`);
    // console.log(config);
    config.nomi = "nomi";
    return config;
  },
  async (error) => {
    // console.log(error);
    console.log(`I am interceptor error`);
    const originalReq = error.config;

    if (
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq.isRetry = true;

      try {
        console.log(`Requesting refresh token`);
        await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }

    // 400 Bad Request : Invalid argument (invalid request payload)
    if (error.response.status === 400) {
      return error;
    }
  }
);
