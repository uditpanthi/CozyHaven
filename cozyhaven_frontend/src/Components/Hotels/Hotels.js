import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Hotels.css";
import Button from "../Button/Button";
import HotelRooms from "../HotelRooms/HotelRooms";
import { Link } from "react-router-dom";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import ConfirmBox from "../ConfirmDelete/ConfirmDelete";

const Hotels = ({ hotels }) => {
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [amenities, setAmenities] = useState({});
  const [allHotels, setHotels] = useState({});
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch amenities for each hotel
    fetchAmenities();
    // Get user role from sessionStorage
    const role = sessionStorage.getItem("role");
    setUserRole(role);
  }, [hotels]);

  const fetchAmenities = async () => {
    // Fetch amenities for each hotel
    for (const hotel of hotels) {
      try {
        const response = await fetch(
          `http://localhost:5108/api/Hotel/HotelAmenities?id=${hotel.hotelId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch amenities");
        }
        const data = await response.json();
        setAmenities((prevAmenities) => ({
          ...prevAmenities,
          [hotel.hotelId]: data.$values.map((amenity) => amenity.amenity.name),
        }));
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    }
  };

  const handleHotelClick = (hotelId) => {
    setSelectedHotelId(hotelId);
  };

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Return the average rating with one decimal place
  };

  const handleHotelDetails = (hotelId) => {
    console.log("View details for hotel with ID:", hotelId);
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

      setHotels(hotels.filter((hotel) => hotel.hotelId !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
      setError("Failed to delete hotel. Please try again.");
    }
  };

  return (
    <div className="main-Hotel">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <>
          {hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.hotelId}>
              <Carousel>
                {hotel.imageURLs.$values.map((imageUrl, index) => (
                  <div key={index}>
                    <img src={imageUrl} alt={hotel.name} />
                  </div>
                ))}
              </Carousel>
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>
                  <i className="ri-map-pin-line"></i> {hotel.address}
                </p>
                <p>{hotel.city}</p>
                <br />
                <h6>{hotel.description}</h6>
                <br />
                <div className="amenities">
                  <span>{amenities[hotel.hotelId]?.join(", ") || "None"}</span>
                </div>
                <p>Number of Rooms: {hotel.numberOfRooms}</p>
                <div className="price-range">
                  <span>{hotel.prePrice}</span>
                  <span>₹{hotel.startingPrice}</span>
                </div>
                <div className="reviews">
                  {hotel.reviews.$values.length > 0 ? (
                    <>
                      <p>
                        Rating: {calculateAverageRating(hotel.reviews.$values)}
                      </p>
                    </>
                  ) : (
                    <p>No reviews available</p>
                  )}
                </div>
                {userRole !== "Admin" && (
                  <Link to={`/hotelrooms/${hotel.hotelId}`}>
                    <Button onClick={() => handleHotelClick(hotel.hotelId)}>
                      Select Room
                    </Button>
                  </Link>
                )}

                {userRole === "Admin" && (
                  <div>
                    <Link to={`/ownerHotelsRooms/${hotel.hotelId}`}>
                      <Button onClick={() => handleHotelDetails(hotel.hotelId)}>
                        View Details
                      </Button>
                    </Link>
                    <ConfirmBox
                    confirmVar="delete"
                      onConfirm={() => handleDeleteHotel(hotel.hotelId)}
                    >
                      Delete
                    </ConfirmBox>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Hotels;
