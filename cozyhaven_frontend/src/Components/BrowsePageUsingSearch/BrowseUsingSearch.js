import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import FilterBar from "../FilterBar/FilterBar";
import Hotels from "../Hotels/Hotels";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";

const BrowseUsingSearch = () => {
    useEffect(() => {
    CursorAnimation();
    }, []);
    const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [locationFound, setLocationFound] = useState(true);

  useEffect(() => {
    // Retrieve search criteria from URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const location = urlSearchParams.get("location");
    const checkin = urlSearchParams.get("checkin");
    const checkout = urlSearchParams.get("checkout");
    const capacity = urlSearchParams.get("capacity");

    // Fetch hotels using the search criteria
    const fetchHotelsByLocationAndDate = async () => {
      try {
        const response = await fetch(
          `http://localhost:5108/api/Hotel/GetHotelByLocationAndDate?location=${location}&checkin=${checkin}&checkout=${checkout}&capacity=${capacity}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data.$values);
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the function to fetch hotels
    fetchHotelsByLocationAndDate();
  }, []);

  return (
    <div>
  <div id="cursor-blur"></div>
      <Navigation />
      .
      <FilterBar />
      <div className="hotel-list">
        {hotels.length > 0 ? (
          <Hotels hotels={hotels} />
        ) : (
          <p>No hotels available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseUsingSearch;
