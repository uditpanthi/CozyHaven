import React, { useEffect, useState } from 'react';
import './ReservationPage.css';
import { useParams } from 'react-router-dom';

const ReservationPage = () => {
  const { roomId } = useParams(); // Extract roomId from URL params
  const username = sessionStorage.getItem('username');
  const [userId, setUserId] = useState(null);
  const [reservation, setReservation] = useState({
    userId: null,
    roomId: roomId,
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date().toISOString().split('T')[0],
    adults: 1,
    children: 0,
    totalPrice: 0,
    status: 0
  });
  const [confirmationBoxVisible, setConfirmationBoxVisible] = useState(false);

  useEffect(() => {
    const fetchUserByUsername = async () => {
      if (!username) {
        console.error('Username is null or empty.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5108/api/User/GetByUsername?username=${username}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data || data.length === 0) {
          throw new Error('User not found.');
        }
        setUserId(data.userId);
        setReservation({  // Update reservation state with userId
          ...reservation,
          userId: data.userId
        });
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };
  
    fetchUserByUsername();
  }, [username]);

  const handleCheckInDateChange = (date) => {
    setReservation({
      ...reservation,
      checkInDate: date.toISOString().split('T')[0],
    });

    // Ensure check-out date is after check-in date
    if (new Date(reservation.checkOutDate) <= date) {
      setReservation({
        ...reservation,
        checkOutDate: new Date(date.getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0], // Next day
      });
    }
  };

  const handleCheckOutDateChange = (date) => {
    setReservation({
      ...reservation,
      checkOutDate: date.toISOString().split('T')[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value
    });
  };

  const handleSubmitReservation = async () => {
    if (reservation.checkInDate === reservation.checkOutDate) {
      alert("Check-out date cannot be the same as check-in date.");
      return; 
    }
    setConfirmationBoxVisible(true);
  };
  

  const confirmReservation = async () => {
    try {
      const response = await fetch(`http://localhost:5108/api/Reservation/AddReservation?username=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
      });
      if (!response.ok) {
        throw new Error('Failed to add reservation');
      }
      console.log('Reservation added successfully');
      setConfirmationBoxVisible(false);
    } catch (error) {
      console.error('Error adding reservation:', error.message);
    }
  };

  const cancelReservation = () => {
    setConfirmationBoxVisible(false);
  };


  return (
    <div className="reservation-page">
      <h2>Reservation Page</h2>
      <form className="reservation-form">
        <div className="form-group">
          <label htmlFor="checkInDate">Check-In Date:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={reservation.checkInDate}
            min={new Date().toISOString().split('T')[0]} // Set min to today
            onChange={(e) => handleCheckInDateChange(new Date(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkOutDate">Check-Out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={reservation.checkOutDate}
            min={reservation.checkInDate} // Set min to check-in date
            onChange={(e) => handleCheckOutDateChange(new Date(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="adults">Adults:</label>
          <input
            type="number"
            id="adults"
            name="adults"
            min="1"
            value={reservation.adults}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="children">Children:</label>
          <input
            type="number"
            id="children"
            name="children"
            min="0"
            value={reservation.children}
            onChange={handleInputChange}
          />
        </div>
        <button className="submit-button" type="button" onClick={handleSubmitReservation}>
          Make Reservation
        </button>
        {confirmationBoxVisible && (
          <div className="confirmation-box">
            <h3>Confirm Reservation</h3>
            <p>Are you sure you want to make this reservation?</p>
            <div className="confirmation-box-buttons">
              <button className="confirm-button" onClick={confirmReservation}>Confirm</button>
              <button className="cancel-button" onClick={cancelReservation}>Cancel</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReservationPage;
