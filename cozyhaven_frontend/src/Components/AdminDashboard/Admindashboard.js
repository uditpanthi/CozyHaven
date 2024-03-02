import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import Amenity from './ManageAmenities/Amenity'
import { CursorAnimation } from '../CursorAnimation/CursorAnimation'
import ManageHotel from './ManageHotels/ManageHotels'

const AdminDashboard = () => {
  useEffect( () => {
    CursorAnimation()
  }, [] );

  return (
    <div >
            <Navigation />.
            <AdminSidebar />
            <div id="cursor-blur"></div>
            <div className='manage-sidebar'  style={{ marginTop: '100px', minHeight:'100vh'}}>
                <ManageHotel></ManageHotel>
                <Amenity/>
            </div>
            <Footer />
        </div>
  )
}

export default AdminDashboard