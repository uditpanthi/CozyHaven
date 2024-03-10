import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import AdminSidebar from "../AdminDashboard/AdminSidebar/AdminSidebar";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import ConfirmBox from "../ConfirmDelete/ConfirmDelete";

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
    CursorAnimation();
    fetchReservations();
  }, []); // Empty dependency array to fetch reservations only once when the component mounts

  const handleDeleteReservation = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Reservation/DeleteReservation?id=${id}`,
        {
          method: "DELETE"
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }
      // Remove the deleted reservation from the reservations state
      setReservations(reservations.filter((reservation) => reservation.reservationId !== id));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

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
                <th>Action</th> {/* Added Action column for delete button */}
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
                  <td>
                    <ConfirmBox confirmVar="delete" onConfirm={() => handleDeleteReservation(reservation.reservationId)}>Delete</ConfirmBox>
                  </td> {/* Delete button */}
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
