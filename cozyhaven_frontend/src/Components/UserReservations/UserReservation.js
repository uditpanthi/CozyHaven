import '../UserReservations/UserReservation.css'; // Import the CSS file
import React, { useState, useEffect } from 'react';

// Define the BookingStatus enum
const BookingStatus = {
  0: 'Pending',
  1: 'Checkout',
  2: 'Approved',
  3: 'Cancelled'
};

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const fetchReservationsByUser = async () => {
      try {
        const response = await fetch(`http://localhost:5108/api/User/${username}/Reservations`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        if (data && data.$values) {
          // Sort reservations by booked date in descending order
          const sortedReservations = data.$values.sort((a, b) => new Date(b.bookedDate) - new Date(a.bookedDate));
          setReservations(sortedReservations);
        } else {
          setReservations([]);
        }
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchReservationsByUser();
  }, [username]);

  return (
    <div className="user-reservations-container">
      {error && <p className="error-message">Error: {error}</p>}
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Booked Date</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.reservationId} className="reservation-item">
              <td>{reservation.reservationId}</td>
              <td>{reservation.checkInDate.split('T')[0]}</td>
              <td>{reservation.checkOutDate.split('T')[0]}</td>
              <td>{reservation.adults}</td>
              <td>{reservation.children}</td>
              <td>₹{reservation.totalPrice}</td>
              <td>{BookingStatus[reservation.status]}</td>
              <td>{reservation.bookedDate.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserReservations;
