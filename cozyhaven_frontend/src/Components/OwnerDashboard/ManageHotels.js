import React, { useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import OwnerSidebar from './OwnerSidebar/OwnerSidebar'
import OwnerHotels from './OwnerHotels/OwnerHotels'
import Footer from '../Footer/Footer'
import { CursorAnimation } from '../CursorAnimation/CursorAnimation'
import AdminSidebar from '../AdminDashboard/AdminSidebar/AdminSidebar'

const ManageOwnerHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [ownerId, setOwnerId] = useState();

    useEffect(() => {
      CursorAnimation();
        fetchOwnerHotels();
      }, []);

    const fetchOwnerHotels = async () => {
        try {
          const username = sessionStorage.getItem("username");
          if (!username) {
            throw new Error("Username not found in session storage.");
          }
    
          const userResponse = await fetch(
            `http://localhost:5108/api/User/GetByUsername?username=${username}`
          );
          if (!userResponse.ok) {
            throw new Error(
              `Failed to retrieve user details for username: ${username}`
            );
          }
          const userData = await userResponse.json();
          const ownerId = userData.userId;
    
          const hotelsResponse = await fetch(
            `http://localhost:5108/api/Hotel/GetHotelsByOwner?ownerId=${ownerId}`
          );
          if (!hotelsResponse.ok) {
            throw new Error(`Failed to fetch hotels for owner with ID: ${ownerId}`);
          }
          const hotelsData = await hotelsResponse.json();
    
          if (!Array.isArray(hotelsData.$values)) {
            throw new Error("Hotels data is not an array.");
          }
    
          sessionStorage.setItem('userId',ownerId)
          setHotels(hotelsData.$values);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching hotels:", error);
          setError("Failed to fetch hotels. Please try again later.");
          setLoading(false);
        }
      };
      
  const userRole = sessionStorage.getItem('role')
  return (
    <div>
        <Navigation/>
        {userRole === 'HotelOwner' ? <OwnerSidebar /> : <AdminSidebar />}
        <div id='cursor-blur'></div>
        <div className='manage-sidebar'  style={{ padding:"120px 0px 0px 0px" }}>
            <OwnerHotels/>
        </div>
        <Footer/>
    </div>
  )
}

export default ManageOwnerHotels