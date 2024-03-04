import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ownerId, setOwnerId] = useState(null);
  const [hotels, setHotels] = useState([]);

 
  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <div className="logo-details">
        <i className="ri-dashboard-line"></i>
          <span className="logo_name">Admin DashBoard</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to={'/adminmanageusers'}>
              <i className="ri-user-settings-line"></i>
              <h4>Users</h4>
            </Link>
          </li>
          <li>
            <Link to={"/adminmanageHotels"}>
            <i className="ri-hotel-line"></i>
              <h4>Hotels</h4>
            </Link>
          </li>
          <li >
            <Link to={'/manageamenity'}>
            <i className="ri-gamepad-line"></i>
              <h4>Amenities</h4>
            </Link>
          </li>
          <li >
            <Link to={'/allreservations'}>
              <i className="ri-survey-line"></i>
              <h4 >Reservations</h4>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
