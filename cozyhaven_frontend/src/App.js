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
import AddHotelForm from "./Components/OwnerDashboard/OwnerHotels/AddHotelForm";
import AddRooms from "./Components/OwnerDashboard/AddRooms/AddRooms";
import OwnerHotelsRooms from "./Components/OwnerDashboard/OwnerHotelRooms/OwnerHotelsRooms";
import ManageOwnerHotels from "./Components/OwnerDashboard/ManageHotels";
import ManageReservations from "./Components/OwnerDashboard/ManageReservations";
import ManageReviews from "./Components/OwnerDashboard/ManageReviews";
import AdminManageHotel from "./Components/AdminDashboard/ManageHotels/AdminManageHotels";
import AdminAmenity from "./Components/AdminDashboard/ManageAmenities/Amenity";
import AdminManageUser from "./Components/AdminDashboard/ManageUsers/AdminManageUser";
import Payment from "./Components/PaymentPage/Payment";
import Reservations from "./Components/Reservations/Reservations";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browsepage" element={<BrowsePage />} />
        <Route path="/browsepage/:location" element={<BrowsePage />} />
        <Route path="/browse-using-search" element={<BrowseUsingSearch />} />
        <Route path="/hotelrooms/:hotelId" element={<HotelRooms />} />
        <Route element={<PrivateRoute />}>
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/allreservations" element={<Reservations />} />
          <Route path='/reservation/:roomId' element={<ReservationPage />} /> 
          <Route path='/payment/:reservationId' element={<Payment/>} />
          {/* Owner Manage */}
          <Route path="/manageHotels" element={<ManageOwnerHotels />} />
          <Route path="/manageReservations/:hotelId" element={<ManageReservations />} />
          <Route path="/manageReviews/:hotelId" element={<ManageReviews />} />
          <Route path="/addHotel/:ownerId" element={<AddHotelForm/>}/>
          <Route path="/addRooms/:hotelId" element={<AddRooms/>}/>
          {/* Admin Manage */}
          <Route path="/adminmanageHotels" element={<AdminManageHotel/>}/>
          <Route path="/adminmanageusers" element={<AdminManageUser/>}/>
          <Route path="/manageamenity" element={<AdminAmenity/>}/>
          <Route path="/ownerHotelsRooms/:hotelId" element={<OwnerHotelsRooms/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
};

export default App;
