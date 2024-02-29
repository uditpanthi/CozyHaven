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
    window.scrollTo(0, 0);
    fetchHotelsByLocation();
  }, [destination]);

  const [query, setQuery] = useState("");
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const fetchHotelsByLocation = async () => {
    try {
      let response;
      if (!destination) {
        response = await fetch("http://localhost:5108/api/Hotel/GetAllHotels");
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
        setHotels([]);
      } else {
        setHotels(data.$values);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredHotels = hotels.filter((hotel) => {
      const nameMatch = hotel.name.toLowerCase().includes(query);
      const cityMatch = hotel.city.toLowerCase().includes(query);
      return nameMatch || cityMatch;
    });
    setQuery(query);
    // Reset hotels to the original list when the input is cleared
    if (query === "") {
      fetchHotelsByLocation();
    } else {
      setHotels(filteredHotels);
    }
  };

  const handleFiltersUpdate = async (filters) => {
    const { location, amenities, priceRange, rating } = filters;
  
    try {
      let response;
      if (amenities.length > 0) {
        const amenitiesQuery = amenities.join(",");
        response = await fetch(
          `http://localhost:5108/api/Hotel/HotelAmenities?id=1&amenities=${amenitiesQuery}`
        );
      } else {
        response = await fetch("http://localhost:5108/api/Hotel/GetAllHotels");
      }
  
      if (!response.ok) {
        throw new Error("Failed to fetch hotels by amenities");
      }
  
      const data = await response.json();
      let filteredHotels = [];
  
      if (data && data.$values) {
        filteredHotels = data.$values.filter((hotel) => {
          if (location && hotel.city !== location) {
            return false;
          }
  
          if (priceRange && (hotel.startingPrice < priceRange[0] || hotel.startingPrice > priceRange[1])) {
            return false;
          }
  
          if (rating) {
            const reviews = hotel.reviews.$values;
            const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRatings / reviews.length;
            if (averageRating < rating) {
              return false;
            }
          }
  
          return true;
        });
      }
  
      setHotels(filteredHotels);
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <>
      <div className="browse-page">
        <div id="cursor-blur"></div>
        <Navigation />
        <FilterBar updateFilters={handleFiltersUpdate} />
        <div className="hotel-list">
          <input
            type="text"
            placeholder="Search hotels..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          {hotels.length === 0 ? (
            <p>
              <br/>
              <br/>
              <br/>
              No hotels available </p>
          ) : (
            <Hotels hotels={hotels} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrowsePage;
