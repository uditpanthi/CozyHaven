import React, { useState, useEffect } from 'react';

const HotelReservations = ({ hotelId }) => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:5108/api/Reservation/HotelReservations?hotelId=${hotelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data.$values);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReservations();
  }, [hotelId]);

  const handleStatusChange = (e, reservationId) => {
    setNewStatus(e.target.value);
    // Optionally, you can also update the status in the local state immediately
    // to provide a better user experience without waiting for the server response
  };

  const handleUpdateStatus = async (reservationId) => {
    try {
      const response = await fetch('http://localhost:5108/api/Reservation/UpdateReservationStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reservationId,
          newStatus
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update reservation status');
      }

      setMessage('Reservation status updated successfully');
      setError('');
    } catch (error) {
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {message && <p>{message}</p>}
      <h2>All Reservations in Hotel</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservationId}>
            <div>
              <p>Reservation ID: {reservation.reservationId}</p>
              <p>Status: {reservation.status}</p>
              <select value={newStatus} onChange={(e) => handleStatusChange(e, reservation.reservationId)}>
                <option value="0">CheckedOut</option>
                <option value="1">Pending</option>
                <option value="2">Approved</option>
                <option value="3">Cancelled</option>
              </select>
              <button onClick={() => handleUpdateStatus(reservation.reservationId)}>Update Status</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelReservations;
