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
import OwnerDashboard from "./Components/OwnerDashboard/OwnerDashboard";
import AddHotelForm from "./Components/OwnerDashboard/OwnerHotels/AddHotelForm";
import AddRooms from "./Components/OwnerDashboard/AddRooms/AddRooms";
import OwnerHotelsRooms from "./Components/OwnerDashboard/OwnerHotelRooms/OwnerHotelsRooms";
import AdminDashboard from "./Components/AdminDashboard/Admindashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browsepage" element={<BrowsePage />} />
        <Route path="/browsepage/:location" element={<BrowsePage />} />
        <Route path="/browse-using-search" element={<BrowseUsingSearch />} />
        <Route path="/hotelrooms/:hotelId" element={<HotelRooms />} />
        <Route element={<PrivateRoute />}>
          <Route path='/reservation/:roomId' element={<ReservationPage />} /> 
          <Route path='/addReview' element={<ReservationPage />} />
        </Route>
        <Route path="/ownerdashboard" element={<OwnerDashboard />} />
        <Route path="/addHotel/:ownerId" element={<AddHotelForm/>}/>
        <Route path="/addRooms/:hotelId" element={<AddRooms/>}/>
        <Route path="/ownerHotelsRooms/:hotelId" element={<OwnerHotelsRooms/>}/>
      </Routes>
    </Router>
  );
};

export default App;
