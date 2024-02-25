import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing Page/LandingPage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import BrowsePage from "./Components/BrowsePage/BrowsePage";
import HotelRooms from "./Components/HotelRooms/HotelRooms";
import PrivateRoute from "./Components/PrivateRouting/PrivateRoute";
import ReservationPage from "./Components/ReservationPage/ReservationPage";
import UserProfile from "./Components/UserProfile/UserProfile";
import BrowseUsingSearch from "./Components/BrowsePageUsingSearch/BrowseUsingSearch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browsepage" element={<BrowsePage />} />
        <Route path="/browsepage/:location" element={<BrowsePage />} />
        <Route path="/hotelrooms/:hotelId" element={<HotelRooms />} />
        <Route element={<PrivateRoute />}>
          <Route path='/reservation/:roomId' element={<ReservationPage />} /> {/* Define route with roomId parameter */}
          <Route path='/addReview' element={<ReservationPage />} />
        </Route>
        <Route path="/browse-using-search" element={<BrowseUsingSearch />} />
      </Routes>
    </Router>
  );
};

export default App;
