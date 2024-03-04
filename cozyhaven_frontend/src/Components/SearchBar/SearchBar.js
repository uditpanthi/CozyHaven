import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../SearchBar/SearchBar.css";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    // Set min check-in date to today
    const today = new Date().toISOString().split("T")[0];
    setCheckinDate(today);

    // Set min check-out date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split("T")[0];
    setCheckoutDate(tomorrowString);
  }, []);

  const handleCheckinChange = (e) => {
    const newDate = e.target.value;
    setCheckinDate(newDate);
    // Automatically update checkout date if it's before the new check-in date
    if (new Date(checkoutDate) < new Date(newDate)) {
      setCheckoutDate(newDate);
    }
  };

  const handleCheckoutChange = (e) => {
    const newDate = e.target.value;
    setCheckoutDate(newDate);

    // Prevent selecting checkout date earlier than check-in date
    if (new Date(newDate) < new Date(checkinDate)) {
      setCheckinDate(newDate);
    }
  };

  const handleSearch = () => {
    if (destination === "") {
      alert("Please enter a location.");
      return;
    }
    if (new Date(checkinDate) >= new Date(checkoutDate)) {
      alert("Check-out date must be after check-in date.");
      return;
    }
  
    const queryParams = new URLSearchParams();
    queryParams.append('location', destination);
    queryParams.append('checkin', checkinDate);
    queryParams.append('checkout', checkoutDate);
    queryParams.append('capacity', Number(adults) + Number(children)); // Convert to numbers
    window.location.href = `/browse-using-search?${queryParams.toString()}`;
  };

  return (
    <div>
      <div id="search_box">
        <div id="input_grid">
          {/* Destination */}
          <div className="box">
            <label>Destination</label>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          {/* Check-in */}
          <div className="box">
            <label>Check-in:</label>
            <input
              type="date"
              placeholder="Check-in-Date"
              value={checkinDate}
              min={checkinDate}
              onChange={handleCheckinChange}
            />
          </div>
          {/* Check-out */}
          <div className="box">
            <label>Check-out:</label>
            <input
              type="date"
              placeholder="Check-out-Date"
              value={checkoutDate}
              min={checkinDate}
              onChange={handleCheckoutChange}
            />
          </div>
          {/* Adults */}
          <div className="box">
            <label>Adults:</label>
            <input
              type="number"
              placeholder="0"
              value={adults}
              min="1"
              onChange={(e) => setAdults(e.target.value)}
            />
          </div>
          {/* Children */}
          <div className="box">
            <label>Children:</label>
            <input
              type="number"
              placeholder="0"
              value={children}
              min="0"
              onChange={(e) => setChildren(e.target.value)}
            />
          </div>
        </div>
        {/* Search Button */}
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
