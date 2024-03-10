import React, { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { Link, useParams } from "react-router-dom";
import OwnerSidebar from "../OwnerSidebar/OwnerSidebar";
import { CursorAnimation } from "../../CursorAnimation/CursorAnimation";

const AddHotelForm = ({ onAddHotel }) => {
  const { ownerId } = useParams();
  const [newHotelData, setNewHotelData] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    numberOfRooms: "", // Initialize as an empty string
    prePrice: "", // Initialize as an empty string
    startingPrice: "", // Initialize as an empty string
    images: [], // Array to store selected images
  });
  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false); // State for showing the popup
  const [hotelId, setHotelId] = useState(null); // State for storing the hotelId

  const handleInputChange = (event, field) => {
    let { value } = event.target;
    if (field === "numberOfRooms" || field === "prePrice" || field === "startingPrice") {
      value = Math.max(0, parseInt(value));
      if (value === 0) {
        value = "";
      }
    }
    setNewHotelData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  useEffect(()=>{
    CursorAnimation();
  },[]);

  const handleImageChange = (event) => {
    const images = Array.from(event.target.files);
    setNewHotelData((prevData) => ({
      ...prevData,
      images,
    }));
  };

  const handleAddHotel = async () => {
    try {
      const hotelData = {
        ownerId: parseInt(ownerId),
        name: newHotelData.name,
        address: newHotelData.address,
        city: newHotelData.city,
        description: newHotelData.description,
        numberOfRooms: parseInt(newHotelData.numberOfRooms),
        prePrice: parseFloat(newHotelData.prePrice),
        startingPrice: parseFloat(newHotelData.startingPrice),
        imageURLs: [""], // Populate this with actual image URLs
      };

      // Make POST request to the API endpoint
      const response = await fetch('http://localhost:5108/api/Hotel/AddHotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
      });

      // Check if the request was successful
      if (response.ok) {
        // Hotel added successfully
        const responseData = await response.json();
        console.log('Hotel added:', responseData);
        // Set the hotelId
        setHotelId(responseData.hotelId);
        // Show the popup to add room
        setShowAddRoomPopup(true);
      } else {
        // Failed to add hotel
        throw new Error('Failed to add hotel. Server responded with ' + response.status);
      }
    } catch (error) {
      console.error('Error adding hotel:', error);
      // Handle error as needed
    } finally {
      // Reset form fields
      setNewHotelData({
        name: '',
        address: '',
        city: '',
        description: '',
        numberOfRooms: '',
        prePrice: '',
        startingPrice: '',
        images: [],
      });
    }
  };

  return (
    <div className="add-form">
      <OwnerSidebar/>
      <div id="cursor-blur"></div>
      <h2>Add New Hotel</h2>
      <input
        type="text"
        value={newHotelData.name}
        onChange={(e) => handleInputChange(e, "name")}
        placeholder="Name"
      />
      <input
        type="text"
        value={newHotelData.address}
        onChange={(e) => handleInputChange(e, "address")}
        placeholder="Address"
      />
      <input
        type="text"
        value={newHotelData.city}
        onChange={(e) => handleInputChange(e, "city")}
        placeholder="City"
      />
      <textarea
        value={newHotelData.description}
        onChange={(e) => handleInputChange(e, "description")}
        placeholder="Description"
      ></textarea>
      <input
        type="number"
        value={newHotelData.numberOfRooms}
        onChange={(e) => handleInputChange(e, "numberOfRooms")}
        placeholder="Number Of Rooms"
      />
      <input
        type="number"
        value={newHotelData.prePrice}
        onChange={(e) => handleInputChange(e, "prePrice")}
        placeholder="Previous Price"
      />
      <input
        type="number"
        value={newHotelData.startingPrice}
        onChange={(e) => handleInputChange(e, "startingPrice")}
        placeholder="New Price"
      />
      <input type="file" onChange={handleImageChange} multiple />{" "}
      {/* Input for selecting multiple images */}
      <Button onClick={handleAddHotel}>Add Hotel</Button>
      <Link to="/managehotels">
        <Button>Cancel</Button>
      </Link>

      {/* Popup for adding room */}
      {showAddRoomPopup && (
        <div className="add-room-popup">
          <h3>Hotel added successfully!</h3>
          <p>Add at least 1 room to your hotel.</p>
          {/* Link to redirect to AddRooms component */}
          <Link to={`/addRooms/${hotelId}`}>
            <Button>Add Room</Button>
          </Link>
          {/* Button to close the popup */}
          <Button onClick={() => setShowAddRoomPopup(false)}>Close</Button>
        </div>
      )}
    </div>
  );
};

export default AddHotelForm;
