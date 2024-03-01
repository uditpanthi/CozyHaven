import React, { useState } from "react";
import Button from "../../Button/Button";
import { Carousel } from "react-responsive-carousel";

const EditHotelForm = ({
  hotel,
  onSaveEdit,
  onCancelEdit,
  handleInputChange,
  updatedHotelData,
}) => {
  return (
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
          value={updatedHotelData.name}
          onChange={handleInputChange}
        />
      </p>
      <br />
      <p>
        Address : <br />
        <input
          type="text"
          name="address"
          value={updatedHotelData.address}
          onChange={handleInputChange}
        />
        <br />
      </p>
      <p>
        City : <br />
        <input
          type="text"
          name="city"
          value={updatedHotelData.city}
          onChange={handleInputChange}
        />
        <br />
      </p>
      <p>
        Description : <br />
        <textarea
          name="description"
          value={updatedHotelData.description}
          onChange={handleInputChange}
        />
      </p>
      <br />
      <p>
        Number of Rooms: <br />
        <input
          type="text"
          name="numberOfRooms"
          value={updatedHotelData.numberOfRooms}
          onChange={handleInputChange}
        />
      </p>
      <br />
      <p>
        Last Price: <br />
        <input
          type="text"
          name="prePrice"
          value={updatedHotelData.prePrice}
          onChange={handleInputChange}
        />
      </p>
      <br />
      <p>
        New Price: <br />
        <input
          type="text"
          name="startingPrice"
          value={updatedHotelData.startingPrice}
          onChange={handleInputChange}
        />
      </p>
      <br />
      <div>
        <Button onClick={onSaveEdit}>Save</Button>
        <Button onClick={onCancelEdit}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditHotelForm;
