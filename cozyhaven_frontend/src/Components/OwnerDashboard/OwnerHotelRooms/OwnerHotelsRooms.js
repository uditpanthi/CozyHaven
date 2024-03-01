import React, { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Navigation from "../../Navigation/Navigation";
import Footer from "../../Footer/Footer";
import { CursorAnimation } from "../../CursorAnimation/CursorAnimation";
import ConfirmDelete from "../../ConfirmDelete/ConfirmDelete";

const OwnerHotelsRooms = () => {
  useEffect(() => {
    CursorAnimation();
  }, []);

  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for showing success popup

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        const [
          roomsResponse,
          hotelResponse,
          amenitiesResponse,
          hotelAmenitiesResponse,
        ] = await Promise.all([
          fetch(
            `http://localhost:5108/api/Hotel/GetRoomsByHotelId?hotelId=${hotelId}`
          ),
          fetch(`http://localhost:5108/api/Hotel/GetById?id=${hotelId}`),
          fetch(`http://localhost:5108/api/Amenity/all`),
          fetch(`http://localhost:5108/api/Hotel/HotelAmenities?id=${hotelId}`),
        ]);

        if (
          !roomsResponse.ok ||
          !hotelResponse.ok ||
          !amenitiesResponse.ok ||
          !hotelAmenitiesResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const roomsData = await roomsResponse.json();
        const hotelData = await hotelResponse.json();
        const amenitiesData = await amenitiesResponse.json();
        const hotelAmenitiesData = await hotelAmenitiesResponse.json();

        setRooms(roomsData.$values);
        setHotel(hotelData);
        setAmenities(amenitiesData.$values);
        setHotelAmenities(hotelAmenitiesData.$values);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHotelAndRooms();
  }, [hotelId]);

  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Room/DeleteRoom?id=${roomId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      // Filter out the deleted room from the state
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddAmenityToHotel = async () => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Amenity/add-amenity-to-hotel?hotelId=${hotelId}&amenityId=${selectedAmenity}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add amenity to hotel");
      }

      // Refresh hotel amenities
      const hotelAmenitiesResponse = await fetch(
        `http://localhost:5108/api/Hotel/HotelAmenities?id=${hotelId}`
      );
      const hotelAmenitiesData = await hotelAmenitiesResponse.json();
      setHotelAmenities(hotelAmenitiesData.$values);

      // Show success popup
      setShowSuccessPopup(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="ownerHotel">
      <Navigation />.<div id="cursor-blur"></div>
      <div className="hotelrooms-container">
        <div className="hotel-info">
          {hotel && <h1>Welcome to {hotel.name}</h1>}
          <Link>
            <Button>View Reservations</Button>
          </Link>
        </div>
        {hotel && <p>{hotel.description}</p>}
        <div className="hotel-amenities">
          <h2>Hotel Amenities</h2>
          <ul>
            {hotelAmenities.map((amenity) => (
              <li key={amenity.amenityId}>{amenity.amenity.name}</li>
            ))}
          </ul>
        </div>
        <div className="leftbig-and-rightsml">
          <div className="rooms-list">
            <Link to={`/addrooms/${hotelId}`}>
              <Button>+ Add Rooms</Button>
            </Link>
            <br />
            <br />
            <ul>
              {rooms.map((room) => (
                <li key={room.roomId} className="room-item">
                  <div className="room-details">
                    <div id="img">
                      <Carousel>
                        {room.imageURLs.$values.map((imageUrl, index) => (
                          <div key={index}>
                            <img src={imageUrl} alt={`Room ${room.roomId}`} />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                    <div className="room-info">
                      <p>Room Type: {room.roomType}</p>
                      <p>Room Size: {room.roomSize}</p>
                      <p>Capacity: {room.capacity}</p>
                      <p>Price per Night: {room.pricePerNight}</p>
                      <Link to={`/edit-room/${room.roomId}`}>
                        <Button>Edit Room</Button>
                      </Link>
                      <ConfirmDelete
                        onDelete={() => handleDeleteRoom(room.roomId)}
                      >
                        Delete Room
                      </ConfirmDelete>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="amenities">
            <h2>Add Amenities</h2>
            <select onChange={(e) => setSelectedAmenity(e.target.value)}>
              <option value="">Select an amenity</option>
              {amenities.map((amenity) => (
                <option key={amenity.amenityId} value={amenity.amenityId}>
                  {amenity.name}
                </option>
              ))}
            </select>
            <br />
            <br />
            <Button onClick={handleAddAmenityToHotel}>
              Add Amenity to Hotel
            </Button>
            {showSuccessPopup && (
              <div className="success-popup">
                <p>Amenity added successfully!</p>
                <Button onClick={handleClosePopup}>OK</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OwnerHotelsRooms;
