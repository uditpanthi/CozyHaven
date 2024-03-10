import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import Hotels from "../Hotels/Hotels";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";

const BrowseUsingSearch = () => {
  useEffect(() => {
    CursorAnimation();
  }, []);

  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [locationFound, setLocationFound] = useState(true);
  const [query, setQuery] = useState("");

  const fetchHotelsByLocationAndDate = async (
    location,
    checkin,
    checkout,
    capacity
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Hotel/GetHotelByLocationAndDate?location=${location}&checkin=${checkin}&checkout=${checkout}&capacity=${capacity}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }
      const data = await response.json();
      setHotels(data.$values);
      setLocationFound(data.$values.length > 0);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Retrieve search criteria from URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const location = urlSearchParams.get("location");
    const checkin = urlSearchParams.get("checkin");
    const checkout = urlSearchParams.get("checkout");
    const capacity = urlSearchParams.get("capacity");

    // Fetch hotels using the search criteria
    fetchHotelsByLocationAndDate(location, checkin, checkout, capacity);
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const nameMatch = hotel.name.toLowerCase().includes(query);
    const cityMatch = hotel.city.toLowerCase().includes(query);
    return nameMatch || cityMatch;
  });

  return (
    <div>
      <div id="cursor-blur"></div>
      <Navigation />
      <div className="hotel-list">
        <input
          type="text"
          placeholder="Search hotels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {hotels.length === 0 ? (
          <p>No hotels available</p>
        ) : (
          <>
            {error && <p>Error: {error}</p>}
            {!error && !locationFound && (
              <p>No hotels available for the selected criteria.</p>
            )}
            {hotels.length > 0 && <Hotels hotels={filteredHotels} />}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseUsingSearch;
