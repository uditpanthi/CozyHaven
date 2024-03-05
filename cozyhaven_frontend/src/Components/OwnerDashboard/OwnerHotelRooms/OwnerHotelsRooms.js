import React, { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Navigation from "../../Navigation/Navigation";
import Footer from "../../Footer/Footer";
import { CursorAnimation } from "../../CursorAnimation/CursorAnimation";
import ConfirmBox from "../../ConfirmDelete/ConfirmDelete";
import EditRoom from "../../OwnerDashboard/OwnerHotelRooms/EditRooms";
import OwnerSidebar from "../OwnerSidebar/OwnerSidebar";
import AdminSidebar from "../../AdminDashboard/AdminSidebar/AdminSidebar";

const OwnerHotelsRooms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    CursorAnimation();
  }, []);

  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoom, setEditedRoom] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditRoom = (room) => {
    setIsEditing(true);
    setEditedRoom(room);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Room/UpdateDetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedRoom),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      // Refresh room data after successful edit
      const updatedRoomsResponse = await fetch(
        `http://localhost:5108/api/Hotel/GetRoomsByHotelId?hotelId=${hotelId}`
      );
      const updatedRoomsData = await updatedRoomsResponse.json();
      setRooms(updatedRoomsData.$values);

      // Reset editing state and edited room
      setIsEditing(false);
      setEditedRoom(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedRoom(null);
  };

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
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddAmenityToHotel = async () => {
    if (!selectedAmenity) {
      setSuccessMessage("Please select an amenity to add.");
      return;
    }

    const amenityAlreadyAdded = hotelAmenities.some(
      (hotelAmenity) => hotelAmenity.amenityId === selectedAmenity
    );

    if (amenityAlreadyAdded) {
      setSuccessMessage("This amenity is already added to the hotel.");
      return;
    }

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

      const hotelAmenitiesResponse = await fetch(
        `http://localhost:5108/api/Hotel/HotelAmenities?id=${hotelId}`
      );
      const hotelAmenitiesData = await hotelAmenitiesResponse.json();
      setHotelAmenities(hotelAmenitiesData.$values);

      setSuccessMessage("Amenity added successfully!");
    } catch (error) {
      setSuccessMessage(
        "Error adding amenity to hotel. Please try again later."
      );
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleRemoveAmenityFromHotel = async (amenityId) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Amenity/delete-amenity-from-hotel?hotelId=${hotelId}&amenityId=${amenityId}`,
        {
          method: "POST",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to remove amenity from hotel");
      }
  
      const updatedHotelAmenities = hotelAmenities.filter(
        (amenity) => amenity.amenityId !== amenityId
      );
      setHotelAmenities(updatedHotelAmenities);
  
      setSuccessMessage("Amenity removed successfully!");
    } catch (error) {
      setSuccessMessage(
        "Error removing amenity from hotel. Please try again later."
      );
    }
  };
  

  if (error) {
    return <p>Error: {error}</p>;
  }

  const userRole = sessionStorage.getItem("role");

  return (
    <div id="ownerHotel">
      <Navigation />
      {userRole === "HotelOwner" ? <OwnerSidebar /> : <AdminSidebar />}
      <div id="cursor-blur"></div>
      <div className="hotelrooms-container">
        <div className="hotel-info">
          {hotel && <h1>Welcome to {hotel.name}</h1>}
          <Link to={`/manageReservations/${hotelId}`}>
            <Button>View Reservations</Button>
          </Link>
        </div>
        {hotel && <p>{hotel.description}</p>}
        <div className="hotel-amenities">
          <h2>Hotel Amenities</h2>
          <ul>
            {hotelAmenities.map((amenity) => (
              <li key={amenity.amenityId}>
                {amenity.amenity.name}
                <span
                  className="remove-amenity"
                  onClick={() =>
                    handleRemoveAmenityFromHotel(amenity.amenityId)
                  }
                >
                  &#10006; {/* Cross icon */}
                </span>
              </li>
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
                      {isEditing && editedRoom.roomId === room.roomId ? (
                        <EditRoom
                          room={editedRoom}
                          onSaveEdit={handleSaveEdit}
                          onCancelEdit={handleCancelEdit}
                          handleInputChange={handleInputChange}
                          updatedRoomData={editedRoom}
                        />
                      ) : (
                        <>
                          <p>Room Type: {room.roomType}</p>
                          <p>Room Size: {room.roomSize}</p>
                          <p>Capacity: {room.capacity}</p>
                          <p>Price per Night: {room.pricePerNight}</p>
                          <Button onClick={() => handleEditRoom(room)}>
                            Edit Room
                          </Button>
                        </>
                      )}
                      <ConfirmBox
                        confirmVar="delete"
                        onConfirm={() => handleDeleteRoom(room.roomId)}
                      ></ConfirmBox>
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
            {successMessage && (
              <div className="success-message">
                <p>{successMessage}</p>
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
