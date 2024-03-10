import React, { useState } from "react";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import "../Register/Register.css";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    dateOfBirth: "",
    userType: 0,
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5108/api/User/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResponseMessage("User registered successfully");
        console.log("User registered successfully:", data);
  
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          window.location.href = "/login"; // Change the URL to your login page
        }, 3000);
      } else {
        const errorData = await response.json();
        setResponseMessage(`Failed to register user: ${errorData}`);
        console.error("Failed to register user:", errorData);
      }
    } catch (error) {
      setResponseMessage(`Error registering user: ${error.message}`);
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <div id="cursor-blur"></div>
      <div id="registration-page">
        <h2>Register</h2>
        <form id="registration-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="userType">User Type</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="0">Regular User</option>
              <option value="1">Hotel Owner</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>{responseMessage}</p>
        <h6>
          Already have an Account? <Link to="/Login">Sign in here</Link>
        </h6>
      </div>
    </div>
  );
};

export default Registration;
