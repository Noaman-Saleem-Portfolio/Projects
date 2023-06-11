import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuBar from "./components/MenuBar/MenuBar";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AddHotel from "./pages/AddHotel/AddHotel";
import Protected from "./components/Protected/Protected";
import useAutoLogin from "./hooks/useAutoLogin";
import Loader from "./components/Loader/Loader";
import Error from "./pages/Error/Error";

// import "./App.css";
import SearchHotel from "./pages/SearchHotel/SearchHotel";
import HotelDetails from "./pages/HotelDetails/HotelDetails";
import UpdateHotel from "./pages/UpdateHotel/UpdateHotel";

function App() {
  const isAuth = useSelector((state) => state.user.auth);

  const loading = useAutoLogin();

  return loading ? (
    <Loader text="..." />
  ) : (
    <BrowserRouter>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/profile"
          element={
            <Protected isAuth={isAuth}>
              <Profile />
            </Protected>
          }
        />

        <Route path="/hotels/search" element={<SearchHotel />} />

        <Route
          path="/add-hotel"
          element={
            <Protected isAuth={isAuth}>
              <AddHotel />
            </Protected>
          }
        />

        <Route
          path="/hotel-update/:id"
          element={
            <Protected isAuth={isAuth}>
              <UpdateHotel />
            </Protected>
          }
        />

        <Route path="/hotel/:id" element={<HotelDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="*"
          element={
            <div className="main">
              <Error />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
