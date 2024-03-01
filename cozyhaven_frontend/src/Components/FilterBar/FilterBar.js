import React, { useState, useEffect } from "react";
import "./FilterBar.css"; // Import your CSS file for FilterBar
import Rating from "react-rating";
import Button from "../Button/Button";

const FilterBar = ({ updateFilters }) => {
  const [locations, setLocations] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [minPrice, setMinPrice] = useState(0); // Min price
  const [maxPrice, setMaxPrice] = useState(2000); // Max price
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(""); // Manage selected location directly

  useEffect(() => {
    // Fetch locations and amenities
    fetch(`http://localhost:5108/api/Hotel/GetAllHotels`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.$values || !Array.isArray(data.$values)) {
          throw new Error("Cities data is not in the expected format");
        }
        const cities = data.$values.map((hotel) => hotel.city);
        setLocations(cities);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });

    fetch(`http://localhost:5108/api/Amenity/all`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.$values || !Array.isArray(data.$values)) {
          throw new Error("Amenities data is not in the expected format");
        }
        const amenities = data.$values.map((amenity) => amenity.name);
        setAmenities(amenities);
      })
      .catch((error) => {
        console.error("Error fetching amenities:", error);
      });
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    updateFilters({
      location: event.target.value,
      amenities: selectedAmenities,
      priceRange: [minPrice, maxPrice],
      rating: selectedRating,
    });
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prevState) =>
      prevState.includes(amenity)
        ? prevState.filter((item) => item !== amenity)
        : [...prevState, amenity]
    );
    updateFilters({
      location: selectedLocation,
      amenities: selectedAmenities,
      priceRange: [minPrice, maxPrice],
      rating: selectedRating,
    });
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(parseInt(event.target.value));
    updateFilters({
      location: selectedLocation,
      amenities: selectedAmenities,
      priceRange: [parseInt(event.target.value), maxPrice],
      rating: selectedRating,
    });
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
    updateFilters({
      location: selectedLocation,
      amenities: selectedAmenities,
      priceRange: [minPrice, parseInt(event.target.value)],
      rating: selectedRating,
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    updateFilters({
      location: selectedLocation,
      amenities: selectedAmenities,
      priceRange: [minPrice, maxPrice],
      rating: rating,
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-option">
        <h4>Price Range</h4>
        <input
          type="range"
          min={0}
          max={2000}
          value={minPrice}
          onChange={handleMinPriceChange}
          step={10}
        />
        <input
          type="range"
          min={0}
          max={2000}
          value={maxPrice}
          onChange={handleMaxPriceChange}
          step={10}
        />
        <span>${minPrice}</span> - <span>${maxPrice}</span>
      </div>

      <div className="filter-option">
        <h4>Location</h4>
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">All Locations</option>
          {[...new Set(locations)].map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="filter-option">
        <h4>Amenities</h4>
        <div className="amenity-buttons">
          {amenities.map((amenity, index) => (
            <Button
              key={index}
              onClick={() => handleAmenityChange(amenity)}
              className={selectedAmenities.includes(amenity) ? "active" : ""}
            >
              {amenity}
            </Button>
          ))}
        </div>
      </div> */}

      <div className="filter-option">
        <h4>Rating</h4>
        <div className="rating-buttons">
          <Rating
            initialRating={selectedRating}
            emptySymbol={<span className="rating-icon">&#9734;</span>}
            fullSymbol={<span className="rating-icon">&#9733;</span>}
            onClick={(value) => handleRatingChange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
