import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import AdminSidebar from "../AdminDashboard/AdminSidebar/AdminSidebar";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5108/api/Reservation/AllReservations"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      setReservations(data.$values || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    CursorAnimation()
    fetchReservations();
  }, []); // Empty dependency array to fetch reservations only once when the component mounts

  return (
    <>
      <Navigation />
      <AdminSidebar />
      <div id="cursor-blur"></div>
      <div className="reservations-container">
        <span>Reservations</span>
        <div className="reservation-table">
          <table className="table">
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Status</th>
                <th>Check-in Date</th>
                <th>Check-out Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.status}</td>
                  <td>{reservation.checkInDate}</td>
                  <td>{reservation.checkOutDate}</td>
                  <td>{reservation.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reservations;
