import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import OwnerSidebar from './OwnerSidebar/OwnerSidebar';
import HotelReservations from '../HotelReservations/HotelReservations';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import HotelReviews from '../HotelReviews/HotelReviews';
import { CursorAnimation } from '../CursorAnimation/CursorAnimation';



const ManageReviews = () => {
  useEffect(()=>{
    CursorAnimation();
  },[])
  const { hotelId } = useParams();
  return (
    <div>
      <div id='cursor-blur'></div>
      <Navigation />
      <OwnerSidebar />
      <div
        className="manage-sidebar"
        style={{ padding:"120px 0px 0px 280px", minHeight: "100vh" }}
      >
        <HotelReviews hotelId={hotelId} />
      </div>
      <Footer />
    </div>
  );
};

export default ManageReviews;
