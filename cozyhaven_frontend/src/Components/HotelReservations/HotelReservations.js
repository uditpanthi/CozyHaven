import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import "../HotelReservations/HotelReservation.css";
import React, { useState, useEffect } from "react";

const BookingStatus = {
  0: "CheckedOut",
  1: "Pending",
  2: "Approved",
  3: "Cancelled",
};

const HotelReservations = ({ hotelId }) => {
  const [reservations, setReservations] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(()=>{
    CursorAnimation();
  },[]);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5108/api/Reservation/HotelReservations?hotelId=${hotelId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        setReservations(data.$values);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReservations();
  }, [hotelId]);

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5108/api/User/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          [userId]: userData,
        }));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Fetch user details for each reservation
    reservations.forEach((reservation) => {
      if (!userDetails[reservation.userId]) {
        fetchUserDetails(reservation.userId);
      }
    });
  }, [reservations, userDetails]);

  const handleUpdateStatus = async (reservationId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Reservation/UpdateReservationStatus?id=${reservationId}&status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update reservation status");
      }

      // Update the status of the reservation immediately after a successful update
      const updatedReservations = reservations.map((reservation) => {
        if (reservation.reservationId === reservationId) {
          return { ...reservation, status: newStatus };
        }
        return reservation;
      });

      setReservations(updatedReservations);

      setMessage("Reservation status updated successfully");
      setError("");
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  // Sort reservations by check-in date, with the latest ones at the top
  const sortedReservations = [...reservations].sort((a, b) => {
    return new Date(b.checkInDate) - new Date(a.checkInDate);
  });

  return (
    <div className="hotel-reservations-container">
      <div id="cursor-blur"></div>
      {error && <p className="error-message">Error: {error}</p>}
      {message && <p className="success-message">{message}</p>}
      {/* <h2 className="hotel-reservations-title">All Reservations in Hotel</h2> */}
      <span>Reservations</span>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Status</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Guest Name</th>
            <th>Contact</th>
            {/* <th>Room Type</th> */}
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedReservations.map((reservation) => (
            <tr key={reservation.reservationId}>
              <td>{reservation.reservationId}</td>
              <td>{BookingStatus[reservation.status]}</td>
              <td>{new Date(reservation.checkInDate).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
              <td>
                {userDetails[reservation.userId]
                  ? userDetails[reservation.userId].username
                  : "Unknown"}
              </td>
              <td>
                {userDetails[reservation.userId]
                  ? userDetails[reservation.userId].contactNumber
                  : "Unknown"}
              </td>
              {/* <td>Room Type</td> Placeholder for room type */}
              <td>₹{reservation.totalPrice.toFixed(2)}</td>
              <td>
                <select
                  className="status-dropdown"
                  value={reservation.status}
                  onChange={(e) =>
                    handleUpdateStatus(
                      reservation.reservationId,
                      parseInt(e.target.value)
                    )
                  }
                >
                  {Object.entries(BookingStatus).map(
                    ([statusId, statusName]) => (
                      <option key={statusId} value={statusId}>
                        {statusName}
                      </option>
                    )
                  )}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelReservations;
