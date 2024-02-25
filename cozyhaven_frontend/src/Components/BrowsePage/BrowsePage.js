import React, { useState, useEffect } from "react";
import FilterBar from "../FilterBar/FilterBar";
import Navigation from "../Navigation/Navigation";
import "../BrowsePage/BrowsePage.css";
import Hotels from "../Hotels/Hotels";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const BrowsePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("location");
  
  useEffect(() => {
    CursorAnimation();
    window.scrollTo(0, 0); // Scroll to the top of the page
    fetchHotelsByLocation();
  }, [destination]);

  const [query, setQuery] = useState("");
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const fetchHotelsByLocation = async () => {
    try {
      let response;
      if (!destination) {
        response = await fetch('http://localhost:5108/api/Hotel/GetAllHotels');
      } else {
        response = await fetch(
          `http://localhost:5108/api/Hotel/GetHotelsByLocation?location=${destination}`
        );
      }
  
      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }
      
      const data = await response.json();
      if (data.$values.length === 0) {
        // No hotels found at the specified location
        setHotels([]);
      } else {
        // Hotels found, update the state
        setHotels(data.$values);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredItems = hotels.filter((hotel) => {
    const nameMatch = hotel.name.toLowerCase().includes(query.toLowerCase());
    const cityMatch = hotel.city.toLowerCase().includes(query.toLowerCase());
    return nameMatch || cityMatch;
  });

  return (
    <>
      <div className="browse-page">
        <div id="cursor-blur"></div>
        <Navigation />
        <FilterBar />
        <div className="hotel-list">
          <input
            type="text"
            placeholder="Search hotels..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          {hotels.length === 0 ? (
            <p>No hotels available at this location</p>
          ) : (
            <Hotels hotels={filteredItems} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrowsePage;
