import React, { useState, useEffect } from "react";
import "../UserProfile/UserProfile.css";
import Navigation from "../Navigation/Navigation";
import Button from "../Button/Button";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import Footer from "../Footer/Footer";
import DropdownSection from "../DropdownComponents/DropdownSection";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    CursorAnimation();
  }, []);

  // Define username state
  var Tusername = sessionStorage.getItem("username");
  const [username, setUsername] = useState(Tusername);

  useEffect(() => {
    // Fetch user details when component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    // Fetch user details from API
    fetch(`http://localhost:5108/api/User/GetByUsername?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        return response.json();
      })
      .then((data) => {
        setUserDetails(data);
        setUpdatedUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details: ", error);
      });
    sessionStorage.setItem("userId", userDetails.userId);
  };

  const handleInputChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:5108/api/User/UpdateUserProfile/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user details");
        }
        setSuccessMessage("User details updated successfully!");
        setEditMode(false); // Disable edit mode after saving
        fetchUserDetails();
      })
      .catch((error) => {
        setErrorMessage("Error updating user details. Please try again.");
        console.error("Error updating user details: ", error);
      });
  };

  const handleCancelClick = () => {
    setUpdatedUserDetails(userDetails);
    setEditMode(false);
  };

  return (
    <>
      <div id="cursor-blur"></div>
      <Navigation />.
      <div className="user-profile-container">
        <div className="user-details">
          <h2>User Profile</h2>
          {editMode ? (
            // Display input fields for editing details in edit mode
            <div className="edit-mode">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={updatedUserDetails.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={updatedUserDetails.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={updatedUserDetails.contactNumber || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUserDetails.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
            </div>
          ) : (
            // Display user details in view mode
            <div className="view-mode">
              <div className="profile-section">
                <h3>First Name: {userDetails.firstName}</h3>
              </div>
              <div className="profile-section">
                <h3>Last Name: {userDetails.lastName}</h3>
              </div>
              <div className="profile-section">
                <h3>Contact Number: {userDetails.contactNumber}</h3>
              </div>
              <div className="profile-section">
                <h3>Email: {userDetails.email}</h3>
              </div>
              <Button onClick={handleEditClick}>Edit</Button>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      <DropdownSection />
      {/* <UserReservations/>
      <UserReview/>
      <HotelReservations hotelId="3" /> */}
      <Footer />
    </>
  );
};

export default UserProfile;
