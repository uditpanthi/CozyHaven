import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="filter-bar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/manage-users">Manage Users</Link>
        </li>
        <li>
          <Link to="/manage-hotels">Manage Hotels</Link>
        </li>
        <li>
          <Link to="/manage-amenities">Manage Amenities</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
