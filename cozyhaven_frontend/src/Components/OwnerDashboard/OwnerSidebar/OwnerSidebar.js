import React from "react";
import { Link } from "react-router-dom";

const OwnerSidebar = () => {
  return (
    <div className="filter-bar">
      <h2>Owner Dashboard</h2>
      <ul>
        <li>
          <Link to="/manage-hotels">Manage Hotels</Link>
        </li>
        <li>
          <Link to="/manage-reviews">Manage Reviews</Link>
        </li>
        <li>
          <Link to="/manage-reservations">Manage Reservations</Link>
        </li>
      </ul>
    </div>
  );
};

export default OwnerSidebar;
