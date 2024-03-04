import React from 'react';
import Navigation from '../Navigation/Navigation';
import OwnerSidebar from './OwnerSidebar/OwnerSidebar';
import HotelReservations from '../HotelReservations/HotelReservations';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import AdminSidebar from '../AdminDashboard/AdminSidebar/AdminSidebar';

const ManageReservations = () => {
  const { hotelId } = useParams();
  const userRole = sessionStorage.getItem('role')

  return (
    <>
      <Navigation />.
      {userRole === 'HotelOwner' ? <OwnerSidebar /> : <AdminSidebar />} {/* Conditionally render sidebar */}
      <div className='manage-sidebar' style={{ marginLeft: '280px', marginTop: '100px', minHeight:"100vh" }}>
        <HotelReservations hotelId={hotelId} />
      </div>
      <Footer/>
    </>
  );
}

export default ManageReservations;
