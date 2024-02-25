import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Hotels.css";
import Button from "../Button/Button";
import HotelRooms from "../HotelRooms/HotelRooms";
import { Link } from "react-router-dom";

const Hotels = ({ hotels }) => {
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  const handleHotelClick = (hotelId) => {
    setSelectedHotelId(hotelId);
  };
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Return the average rating with one decimal place
  };

  return (
    <div className="main-Hotel">
      {selectedHotelId !== null ? (
        <div className="rooms-section">
          <HotelRooms hotelId={selectedHotelId} />
        </div>
      ) : (
        hotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
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

              <Link to={`/hotelrooms/${hotel.hotelId}`}>
                <Button onClick={() => handleHotelClick(hotel.hotelId)}>
                  Select Room
                </Button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Hotels;
