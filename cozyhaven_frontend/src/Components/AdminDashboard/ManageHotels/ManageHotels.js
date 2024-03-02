import React, { useState, useEffect } from 'react';
import Hotels from '../../Hotels/Hotels';

const ManageHotel = () => {
  const [query, setQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []); // Fetch hotels when the component mounts

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:5108/api/Hotel/GetAllHotels');
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data.$values || []);
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
    if (query === '') {
      fetchHotels();
    } else {
      setHotels(filteredHotels);
    }
  };

  return (
    <div>
      <div className="hotel-list">
        <input
          type="text"
          placeholder="Search hotels..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        {hotels.length === 0 ? (
          <p>No hotels available</p>
        ) : (
          <Hotels hotels={hotels} />
        )}
      </div>
    </div>
  );
};

export default ManageHotel;
