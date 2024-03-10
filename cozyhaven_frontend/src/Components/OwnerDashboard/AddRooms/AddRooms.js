import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../Button/Button";
import OwnerHotelsRooms from "../OwnerHotelRooms/OwnerHotelsRooms";
import OwnerSidebar from "../OwnerSidebar/OwnerSidebar";
import { CursorAnimation } from "../../CursorAnimation/CursorAnimation";

const AddRooms = () => {
  const { hotelId } = useParams(); // Get hotelId from URL params
  const [roomData, setRoomData] = useState({
    hotelId: hotelId,
    roomSize: 0,
    roomType: "",
    pricePerNight: 0,
    capacity: 0,
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for showing success popup

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setRoomData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5108/api/Room/AddRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId: parseInt(hotelId),
          roomSize: parseInt(roomData.roomSize),
          roomType: roomData.roomType,
          pricePerNight: parseInt(roomData.pricePerNight),
          capacity: parseInt(roomData.capacity),
          available: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add room");
      }

      setShowSuccessPopup(true);
      setRoomData({
        roomSize: 0,
        roomType: "",
        pricePerNight: 0,
        capacity: 0,
      });
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };
  useEffect(()=>{
    CursorAnimation();
  },[]);

  return (
    <div className="add-form">
      <OwnerSidebar/>
      <div id="cursor-blur"></div>
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Type:</label>
          <input
            type="text"
            value={roomData.roomType}
            onChange={(e) => handleInputChange(e, "roomType")}
            required
          />
        </div>
        <div className="form-group">
          <label>Room Size:</label>
          <input
            type="number"
            value={roomData.roomSize}
            onChange={(e) => handleInputChange(e, "roomSize")}
            required
          />
        </div>
        <div className="form-group">
          <label>Price per Night:</label>
          <input
            type="number"
            value={roomData.pricePerNight}
            onChange={(e) => handleInputChange(e, "pricePerNight")}
            required
          />
        </div>
        <div className="form-group">
          <label>Capacity:</label>
          <input
            type="number"
            value={roomData.capacity}
            onChange={(e) => handleInputChange(e, "capacity")}
            required
          />
        </div>
        <Button type="submit">Add Room</Button>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <p>Room added successfully!</p>
          <Link to={`/ownerHotelsRooms/${hotelId}`}>
            <Button>OK</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddRooms;
