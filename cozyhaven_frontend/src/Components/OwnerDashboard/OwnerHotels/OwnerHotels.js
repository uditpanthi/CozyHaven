import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "../../Button/Button";
import "./Owner.css";
import EditHotelForm from "./EditHotel";
import { Link } from "react-router-dom";
import ConfirmBox from "../../ConfirmDelete/ConfirmDelete";

const OwnerHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableHotel, setEditableHotel] = useState(null);
  const [error, setError] = useState(null);
  const [updatedHotelData, setUpdatedHotelData] = useState({});
  const [ownerId, setOwnerId] = useState();

  useEffect(() => {
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

      setOwnerId(ownerId);
      setHotels(hotelsData.$values);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setError("Failed to fetch hotels. Please try again later.");
      setLoading(false);
    }
  };

  const handleEditHotel = (hotelId) => {
    setEditableHotel(hotelId);
    // Set default values for the hotel being edited
    const hotelToEdit = hotels.find((hotel) => hotel.hotelId === hotelId);
    if (hotelToEdit) {
      setUpdatedHotelData({ ...hotelToEdit });
    }
  };

  const handleCancelEdit = () => {
    setEditableHotel(null);
  };

  const handleSaveEdit = async (hotelId) => {
    try {
      // Find the hotel object by ID
      const hotelToUpdate = hotels.find((hotel) => hotel.hotelId === hotelId);

      if (!hotelToUpdate) {
        throw new Error(`Hotel with ID ${hotelId} not found.`);
      }

      const response = await fetch(
        `http://localhost:5108/api/Hotel/UpdateHotelDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: hotelId,
            ownerId,
            name: updatedHotelData.name,
            description: updatedHotelData.description,
            address: updatedHotelData.address,
            city: updatedHotelData.city,
            numberOfRooms: updatedHotelData.numberOfRooms,
            prePrice: updatedHotelData.prePrice,
            startingPrice: updatedHotelData.startingPrice,
            imageURLs: hotelToUpdate.imageURLs,
          }),
        }
      );

      const responseData = await response.json(); // Log response data for debugging
      console.log(responseData);

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
  const handleDeleteHotel = async (hotelId) => {
    try {
      // Confirm deletion with the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this hotel?"
      );
      if (!confirmDelete) {
        return; // If user cancels deletion, do nothing
      }

      const response = await fetch(
        `http://localhost:5108/api/Hotel/DeleteHotel?id=${hotelId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete hotel.");
      }

      // Remove the deleted hotel from the state
      setHotels(hotels.filter((hotel) => hotel.hotelId !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
      setError("Failed to delete hotel. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHotelData({
      ...updatedHotelData,
      [name]: value,
    });
  };

  return (
    <div className="main-Hotel-owner">
      <Link to={`/addHotel/${ownerId}`}>
        <Button>+ Add Hotel</Button>
      </Link>

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
                <EditHotelForm
                  hotel={hotel}
                  onSaveEdit={() => handleSaveEdit(hotel.hotelId)}
                  onCancelEdit={handleCancelEdit}
                  handleInputChange={handleInputChange}
                  updatedHotelData={updatedHotelData}
                />
              ) : (
                <div className="hotel-owner-info">
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
                  <Button onClick={() => handleEditHotel(hotel.hotelId)}>
                    Edit
                  </Button>
                  <Link to={`/ownerHotelsRooms/${hotel.hotelId}`}>
                    <Button>
                      View Details
                    </Button>
                  </Link>
                  <ConfirmBox confirmVar="delete" onConfirm={() => handleDeleteHotel(hotel.hotelId)}>
                  </ConfirmBox>
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
