import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../OwnerSidebar/sidebar.css";

const OwnerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ownerId, setOwnerId] = useState(null);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const ownerId = sessionStorage.getItem("userId");
    setOwnerId(ownerId);

    const fetchHotels = async () => {
      try {
        const hotelsResponse = await fetch(
          `http://localhost:5108/api/Hotel/GetHotelsByOwner?ownerId=${ownerId}`
        );
        if (!hotelsResponse.ok) {
          throw new Error(
            `Failed to fetch hotels for owner with ID: ${ownerId}`
          );
        }
        const hotelsData = await hotelsResponse.json();
        if (!Array.isArray(hotelsData.$values)) {
          throw new Error("Hotels data is not an array.");
        }
        setHotels(hotelsData.$values);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, [ownerId]);

  const handleSubMenuClick = (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <div className="logo-details">
          <i className="ri-hotel-line"></i>
          <span className="logo_name">owner DashBoard</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to={"/managehotels"}>
              <i className="bx bx-grid-alt"></i>
              <h4>Hotels</h4>
            </Link>
          </li>
          <li onClick={handleSubMenuClick}>
            <Link>
              <i className="bx bx-collection"></i>
              <h4>Reviews</h4>
            </Link>
            <ul className="sub-menu">
              {hotels.map((hotel) => (
                <li key={hotel.id}>
                  <Link to={`/manageReviews/${hotel.hotelId}`}>
                    {hotel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li onClick={handleSubMenuClick}>
            <Link>
              <i className="ri-survey-line"></i>
              <h4>Reservations</h4>
            </Link>
            <ul className="sub-menu">
              {hotels.map((hotel) => (
                <li key={hotel.id}>
                  <Link to={`/manageReservations/${hotel.hotelId}`}>
                    {hotel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OwnerSidebar;
