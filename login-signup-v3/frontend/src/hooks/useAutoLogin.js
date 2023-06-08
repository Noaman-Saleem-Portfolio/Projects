import { useState, useEffect } from "react";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function useAutoLogin() {
  // console.log(`We are on useAutoLogin Custom Hook`);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // IIFE
    (async function autoLoginApiCall() {
      try {
        // console.log(`We are on useEffect autoLoginApiCall Custom Hook`);
        const response = await axios.get(
          `${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // console.log(`refresh ka response 200 aya`);
          // 1. setUser
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          };

          dispatch(setUser(user));
        }
      } catch (error) {
        console.log(`useEffect error`);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading;
}

export default useAutoLogin;
