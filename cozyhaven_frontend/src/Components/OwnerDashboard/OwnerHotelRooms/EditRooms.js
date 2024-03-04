import React from "react";
import Button from "../../Button/Button";
import { Carousel } from "react-responsive-carousel";
import ConfirmBox from "../../ConfirmDelete/ConfirmDelete";

const EditRoom = ({
  room,
  onSaveEdit,
  onCancelEdit,
  handleInputChange,
  updatedRoomData,
}) => {
  // Initialize updatedRoomData with room data if it's not already initialized
  if (!updatedRoomData) {
    updatedRoomData = {
      roomType: room.roomType,
      roomSize: room.roomSize,
      capacity: room.capacity,
      pricePerNight: room.pricePerNight,
    };
  }

  return (
    <div className="editable-room">
      {/* <Carousel>
        {room.imageURLs.$values.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Room ${room.roomId}`} />
          </div>
        ))}
      </Carousel> */}
      <p>
        Room Type: <br />
        <input
          type="text"
          name="roomType"
          value={updatedRoomData.roomType}
          onChange={handleInputChange}
        />
      </p>
      <br />
      <p>
        Room Size: <br />
        <input
          type="text"
          name="roomSize"
          value={updatedRoomData.roomSize}
          onChange={handleInputChange}
        />
        <br />
      </p>
      <p>
        Capacity: <br />
        <input
          type="text"
          name="capacity"
          value={updatedRoomData.capacity}
          onChange={handleInputChange}
        />
        <br />
      </p>
      <p>
        Price per Night: <br />
        <input
          type="text"
          name="pricePerNight"
          value={updatedRoomData.pricePerNight}
          onChange={handleInputChange}
        />
      </p>
      <br />
      <div>
        <ConfirmBox confirmVar={"save changes"} onConfirm={onSaveEdit}>Save</ConfirmBox>
        <Button onClick={onCancelEdit}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditRoom;
