// AddHotelForm.js
import React, { useState } from "react";
import Button from "../../Button/Button";

const AddHotelForm = ({ onAddHotel, onCancel }) => {
  const [newHotelData, setNewHotelData] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    numberOfRooms: 0,
    prePrice: 0,
    startingPrice: 0
  });

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setNewHotelData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleAddHotel = () => {
    onAddHotel(newHotelData);
    setNewHotelData({
      name: "",
      address: "",
      city: "",
      description: "",
      numberOfRooms: 0,
      prePrice: 0,
      startingPrice: 0
    });
  };

  return (
    <div className="add-hotel-form">
      <h3>Add New Hotel</h3>
      <input type="text" value={newHotelData.name} onChange={(e) => handleInputChange(e, 'name')} placeholder="Name" />
      <input type="text" value={newHotelData.address} onChange={(e) => handleInputChange(e, 'address')} placeholder="Address" />
      <input type="text" value={newHotelData.city} onChange={(e) => handleInputChange(e, 'city')} placeholder="City" />
      <textarea value={newHotelData.description} onChange={(e) => handleInputChange(e, 'description')} placeholder="Description"></textarea>
      <input type="number" value={newHotelData.numberOfRooms} onChange={(e) => handleInputChange(e, 'numberOfRooms')} placeholder="Number of Rooms" />
      <input type="number" value={newHotelData.prePrice} onChange={(e) => handleInputChange(e, 'prePrice')} placeholder="Pre Price" />
      <input type="number" value={newHotelData.startingPrice} onChange={(e) => handleInputChange(e, 'startingPrice')} placeholder="Starting Price" />
      <Button onClick={handleAddHotel}>Add Hotel</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default AddHotelForm;
