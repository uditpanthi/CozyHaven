import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "../../Button/Button";
import AddHotelForm from "./AddHotelForm";
import "./OwnerHotels.css";

const OwnerHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddHotelForm, setShowAddHotelForm] = useState(false);
  const [editableHotel, setEditableHotel] = useState(null);
  const [error, setError] = useState(null);
  const [updatedHotelData, setUpdatedHotelData] = useState({});

  useEffect(() => {
    fetchOwnerHotels();
  }, []);
  
  useEffect(() => {
    // Set updatedHotelData to the default hotel data when editableHotel changes
    if (editableHotel !== null) {
      const hotelToUpdate = hotels.find(hotel => hotel.hotelId === editableHotel);
      if (hotelToUpdate) {
        setUpdatedHotelData({ ...hotelToUpdate });
      }
    }
  }, [editableHotel, hotels]);
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

      setHotels(hotelsData.$values);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setError("Failed to fetch hotels. Please try again later.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHotelData({
      ...updatedHotelData,
      [name]: value,
    });
  };

  const handleSaveEdit = async (hotelId) => {
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
      console.log(ownerId);
      console.log(hotelId);
      console.log(updatedHotelData);

      const response = await fetch(
        `http://localhost:5108/api/Hotel/UpdateHotelDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotelId,
            ownerId,
            ...updatedHotelData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update hotel details.");
      }
      fetchOwnerHotels();
    } catch (error) {
      console.error("Error updating hotel details:", error);
      setError("Failed to update hotel details. Please try again.");
    } finally {
      setEditableHotel(null);
    }
  };

  const handleAddHotel = async (newHotelData) => {
    try {
      // Implement add hotel logic here
    } catch (error) {
      console.error("Error adding new hotel:", error);
    }
  };

  const handleHotelDetails = (hotelId) => {
    console.log("View details for hotel with ID:", hotelId);
  };

  const handleEditHotel = (hotelId) => {
    setEditableHotel(hotelId);
  };

  const handleCancelEdit = () => {
    setEditableHotel(null);
  };

  return (
    <div className="main-Hotel-owner">
      {showAddHotelForm ? (
        <AddHotelForm
          onAddHotel={(newHotelData) => {
            handleAddHotel(newHotelData);
            setShowAddHotelForm(false);
          }}
          onCancel={() => setShowAddHotelForm(false)}
        />
      ) : (
        <Button onClick={() => setShowAddHotelForm(true)}>+ Add Hotel</Button>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : hotels.length === 0 ? (
        <p>No hotels found for this owner.</p>
      ) : (
        <div className="hotel-owner-list">
          {hotels.map((hotel) => (
            <div className="hotel-owner-card" key={hotel.hotelId}>
              {editableHotel === hotel.hotelId ? (
                <div className="editable-hotel">
                  <Carousel>
                    {hotel.imageURLs.$values.map((imageUrl, index) => (
                      <div key={index}>
                        <img src={imageUrl} alt={hotel.name} />
                      </div>
                    ))}
                  </Carousel>
                  <p>
                    Hotel name : <br />
                    <input
                      type="text"
                      name="name"
                      value={updatedHotelData.name || hotel.name}
                      onChange={handleInputChange}
                    />
                  </p>
                  <br />
                  <p>
                    Address : <br />
                    <input
                      type="text"
                      name="address"
                      value={
                        updatedHotelData.address ||
                        `${hotel.address}, ${hotel.city}`
                      }
                      onChange={handleInputChange}
                    />
                    <br />
                  </p>
                  <p>
                    Description : <br />
                    <textarea
                      name="description"
                      value={updatedHotelData.description || hotel.description}
                      onChange={handleInputChange}
                    />
                  </p>
                  <br />
                  <p>
                    Number of Rooms: <br />
                    <input
                      type="text"
                      name="numberOfRooms"
                      value={
                        updatedHotelData.numberOfRooms || hotel.numberOfRooms
                      }
                      onChange={handleInputChange}
                    />
                  </p>
                  <br />
                  <p>
                    Last Price: <br />
                    <input
                      type="text"
                      name="prePrice"
                      value={updatedHotelData.prePrice || hotel.prePrice}
                      onChange={handleInputChange}
                    />
                  </p>
                  <br />
                  <p>
                    New Price: <br />
                    <input
                      type="text"
                      name="startingPrice"
                      value={
                        updatedHotelData.startingPrice || hotel.startingPrice
                      }
                      onChange={handleInputChange}
                    />
                  </p>

                  <br />
                  <div>
                    <Button onClick={() => handleSaveEdit(hotel.hotelId)}>
                      Save
                    </Button>
                    <Button onClick={() => handleCancelEdit()}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="hotel-info">
                  <Carousel>
                    {hotel.imageURLs.$values.map((imageUrl, index) => (
                      <div key={index}>
                        <img src={imageUrl} alt={hotel.name} />
                      </div>
                    ))}
                  </Carousel>
                  <h2>{hotel.name}</h2>
                  <h3>
                    {hotel.address}, {hotel.city}
                  </h3>
                  <br />
                  <h6>{hotel.description}</h6>
                  <br />
                  <p>Number of Rooms: {hotel.numberOfRooms}</p>
                  <br />
                  <p>Last Price: {hotel.prePrice}</p>
                  <p>New Price: {hotel.startingPrice}</p>
                  <Button onClick={() => setEditableHotel(hotel.hotelId)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleHotelDetails(hotel.hotelId)}>
                    View Details
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerHotels;
