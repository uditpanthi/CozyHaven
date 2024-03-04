import React, { useState } from "react";
import UserReviews from "../Reviews/UserReview";
import UserReservations from "../UserReservations/UserReservation";
import HotelReservations from "../HotelReservations/HotelReservations";
import "../DropdownComponents/dropdown.css";

const DropdownSection = () => {
  const [dropdownVisible, setDropdownVisible] = useState({
    userReservations: false,
    userReview: false,
    hotelReservations: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownVisible((prevState) => ({
      userReservations:
        dropdown === "userReservations" ? !prevState.userReservations : false,
      userReview: dropdown === "userReview" ? !prevState.userReview : false,
      hotelReservations:
        dropdown === "hotelReservations" ? !prevState.hotelReservations : false,
    }));
  };

  return (
    <div className="dropdown-section-container">
      {/* User Reservations Dropdown Section */}
      <div className="dropdown-section">
        <h2 onClick={() => toggleDropdown("userReservations")} aria-expanded={dropdownVisible.userReservations}>
          Reservations
        </h2>
        <div className={`dropdown-content ${ dropdownVisible.userReservations ? "open" : "" }`} >
          {dropdownVisible.userReservations && <UserReservations />}
        </div>
      </div>

      {/* User Review Dropdown Section */}
      <div className="dropdown-section">
        <h2 onClick={() => toggleDropdown("userReview")} aria-expanded={dropdownVisible.userReview} >
          Reviews
        </h2>
        <div className={`dropdown-content ${ dropdownVisible.userReview ? "open" : "" }`} >
          {dropdownVisible.userReview && <UserReviews />}
        </div>
      </div>

      {/* Hotel Reservations Dropdown Section */}
      {/* <div className="dropdown-section">
        <h2 onClick={() => toggleDropdown("hotelReservations")} aria-expanded={dropdownVisible.hotelReservations} >
          Payments
        </h2>
        <div className={`dropdown-content ${ dropdownVisible.hotelReservations ? "open" : "" }`} >
          {dropdownVisible.hotelReservations && (
            <HotelReservations hotelId="3" />
          )}
        </div>
      </div> */}
    </div>
  );
};

export default DropdownSection;
