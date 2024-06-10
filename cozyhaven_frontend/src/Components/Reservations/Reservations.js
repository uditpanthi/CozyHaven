import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import AdminSidebar from "../AdminDashboard/AdminSidebar/AdminSidebar";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import ConfirmBox from "../ConfirmDelete/ConfirmDelete";

const formatDate=(dateString)=>{
  const date=new Date(dateString);
  const day=date.getDate();
  const month=date.getMonth()+1;
  const year=date.getFullYear();
  return `${day}-${month < 10 ? '0' + month:month}-${year}`
};

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
        <div className="reservation-heading-tile">
          <p>Reservation ID</p>
          <p>Status</p>
          <p>Check-in Date</p>
          <p>Check-out Date</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        <div className="reservation-tiles">
          {reservations.map((reservation) => (
              <div key={reservation.reservationId} className="reservation-tile-data">
                <p>{reservation.reservationId}</p>
                <p>{reservation.status}</p>
                <p>{formatDate(reservation.checkInDate)}</p>
                <p>{formatDate(reservation.checkOutDate)}</p>
                <p>{reservation.totalPrice}</p>
                <ConfirmBox confirmVar="delete" onConfirm={() => handleDeleteReservation(
                  reservation.reservationId)}>
                  Delete</ConfirmBox> </div>
            ))}
        </div>
      </div>
    </>
  );

};
export default Reservations;
