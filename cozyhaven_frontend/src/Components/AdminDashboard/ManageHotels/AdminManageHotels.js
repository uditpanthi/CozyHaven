import React, { useState, useEffect } from 'react';
import Hotels from '../../Hotels/Hotels';
import Navigation from '../../Navigation/Navigation';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Footer from '../../Footer/Footer';
import { CursorAnimation } from '../../CursorAnimation/CursorAnimation';

const AdminManageHotel = () => {
  const [query, setQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    CursorAnimation();
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
    <>
      <div className='browse-page'>
        <Navigation />
        <div id='cursor-blur'></div>
        <AdminSidebar/>
        <div className="hotel-list">
          <input
            type="text"
            placeholder="Search hotels..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          {hotels.length === 0 ? (
            <p><br/><br/><br/>No hotels available</p>
          ) : (
            <Hotels hotels={hotels} />
          )}
        </div>
      </div>
        <Footer/>
    </>
  );
};

export default AdminManageHotel;
