import React, { useState, useEffect } from "react";
import "../ManageAmenities/Amenity.css";
import Button from "../../Button/Button";
import ConfirmBox from "../../ConfirmDelete/ConfirmDelete";
import Navigation from "../../Navigation/Navigation";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { CursorAnimation } from "../../CursorAnimation/CursorAnimation";
import Footer from "../../Footer/Footer";

const AdminAmenity = () => {
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newAmenityName, setNewAmenityName] = useState("");
  const [isAddingAmenity, setIsAddingAmenity] = useState(false);
  const [amenityId, setAmenityId] = useState("");
  const [fetchAmenity, setFetchAmenity] = useState(null);
  const [updateAmenityNames, setUpdateAmenityNames] = useState({});
  const [showFetchAmenity, setShowFetchAmenity] = useState(false);
  const [hotelInput, setHotelInput] = useState("");
  const [showHotelInput, setShowHotelInput] = useState(false);

  const fetchAmenities = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5108/api/Amenity/all");
      if (!response.ok) {
        throw new Error("Failed to fetch amenities");
      }
      const data = await response.json();
      setAmenities(data.$values || []);
    } catch (error) {
      console.error("Error fetching amenities:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    CursorAnimation();
  }, []);

  useEffect(() => {
    fetchAmenities();
  }, []);

  const addAmenity = async () => {
    try {
      const response = await fetch("http://localhost:5108/api/Amenity/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          name: newAmenityName, // Use the input value as the amenity name
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add amenity");
      }
      console.log("Amenity added successfully");
      fetchAmenities(); // Fetch amenities again to update the list
      setNewAmenityName(""); // Reset input field
      setIsAddingAmenity(false); // Hide the input field after adding amenity
    } catch (error) {
      console.error("Error adding amenity:", error);
    }
  };

  const deleteAmenity = async (id) => {
    try {
      const response = await fetch(`http://localhost:5108/api/Amenity/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete amenity");
      }
      console.log("Amenity deleted successfully");
      fetchAmenities(); // Fetch amenities again to update the list
    } catch (error) {
      console.error("Error deleting amenity:", error);
    }
  };

  const updateAmenity = async (id, newName) => {
    try {
      const response = await fetch(`http://localhost:5108/api/Amenity/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: newName,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update amenity");
      }
      console.log("Amenity updated successfully");
      fetchAmenities(); // Fetch amenities again to update the list
    } catch (error) {
      console.error("Error updating amenity:", error);
    }
  };

  const addAmenityToHotel = async (id, amenityId) => {
    setShowHotelInput(true);
    setAmenityId(amenityId);
  };

  const confirmAddToHotel = async () => {
    setShowHotelInput(false);
    try {
      const response = await fetch(
        `http://localhost:5108/api/Amenity/add-amenity-to-hotel?hotelId=${hotelInput}&amenityId=${amenityId}`,
        {
          method: "POST",
          headers: {
            Accept: "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add amenity to hotel");
      }
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error("Error adding amenity to hotel:", error);
    }
  };

  return (
    <>
      <div id="cursor-blur"></div>
      <Navigation />
      <AdminSidebar />
      <div
        className="manage-amenity"
        style={{ padding:"120px 0px 0px 0px", minHeight: "100vh" }}
      >
        <span>Amenities</span>
        <div className="card-header admin-amenity-header">
          <div>
            <div className="btn-group admin-amenity-btn-group">
              {!isAddingAmenity && (
                <Button
                  className="admin-amenity-btn ml-2"
                  onClick={() => setIsAddingAmenity(true)}
                >
                  Add Amenity
                </Button>
              )}
              {showHotelInput && (
                <div className="card-footer">
                  <input
                    type="text"
                    className="admin-amenity-form-control"
                    placeholder="Enter Hotel ID"
                    value={hotelInput}
                    onChange={(e) => setHotelInput(e.target.value)}
                  />
                  <button
                    className="admin-amenity-btn ml-2"
                    onClick={confirmAddToHotel}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="card-body">
            {isAddingAmenity && (
              <div className="add-amenity">
                <input
                  type="text"
                  className="admin-amenity-form-control"
                  placeholder="Enter amenity name"
                  value={newAmenityName}
                  onChange={(e) => setNewAmenityName(e.target.value)}
                />
                <button
                  className="admin-amenity-btn"
                  type="button"
                  onClick={addAmenity}
                >
                  Add
                </button>
              </div>
            )}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className="admin-amenity-list">
                {amenities.map((amenity) => (
                  <li key={amenity.amenityId} className="admin-amenity-item">
                    <h3>{amenity.name}</h3>
                    <div
                      className="btn-group admin-amenity-btn-group"
                      role="group"
                    >
                      <input
                        type="text"
                        className="admin-amenity-form-control"
                        placeholder="New Name"
                        value={updateAmenityNames[amenity.amenityId] || ""}
                        onChange={(e) =>
                          setUpdateAmenityNames({
                            ...updateAmenityNames,
                            [amenity.amenityId]: e.target.value,
                          })
                        }
                      />
                      <Button
                        className="admin-amenity-btn"
                        onClick={() =>
                          updateAmenity(
                            amenity.amenityId,
                            updateAmenityNames[amenity.amenityId]
                          )
                        }
                      >
                        Update
                      </Button>
                      <ConfirmBox
                        confirmVar="delete"
                        onConfirm={() => deleteAmenity(amenity.amenityId)}
                      ></ConfirmBox>
                      {/* <Button
                        className="admin-amenity-btn"
                        onClick={() => addAmenityToHotel(1, amenity.amenityId)} // Assuming hotel ID is 1, change accordingly
                      >
                        Add to Hotel
                      </Button> */}

                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* {showFetchAmenity && (
            <div className="card-footer">
              <h3>Fetched Amenity</h3>
              <p>ID: {fetchAmenity.amenityId}</p>
              <p>Name: {fetchAmenity.name}</p>
            </div>
          )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminAmenity;
