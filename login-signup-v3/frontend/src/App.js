import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuBar from "./components/MenuBar/MenuBar";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AddHostel from "./pages/AddHostel/AddHostel";
import Protected from "./components/Protected/Protected";
import useAutoLogin from "./hooks/useAutoLogin";
import Loader from "./components/Loader/Loader";
import Error from "./pages/Error/Error";

import "./App.css";

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

        <Route
          path="/add-hotel"
          element={
            <Protected isAuth={isAuth}>
              <AddHostel />
            </Protected>
          }
        />

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
