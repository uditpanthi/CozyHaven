import React, { useEffect } from "react";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import '../Register/Register.css'
import { Link } from 'react-router-dom';

const Registration = () => {
    useEffect(() => {
        CursorAnimation();
    }, []);

    const handleRegister = async (event) => {
        event.preventDefault();

        // Fetch form data
        const formData = new FormData(event.target);

        // Convert form data to JSON object
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });

        // Post user details
        try {
            const response = await fetch('http://localhost:5108/api/User/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJSON)
            });

            if (response.ok) {
                console.log('User registered successfully');
                // Redirect or show a success message here
            } else {
                console.error('Failed to register user:', response.status);
                // Handle error, show error message, etc.
            }
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle network errors, etc.
        }
    };

    return (
        <div>
            <div id="cursor-blur"></div>
            <div id="registration-page">
                <h2>Register</h2>
                <form id="registration-form" onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" name="firstName" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastname" name="lastName" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="contact">Contact No</label>
                        <input type="tel" id="contact" name="contactNumber" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="userType">User Type</label>
                        <select id="userType" name="userType" required>
                            <option value="0">Regular User</option>
                            <option value="1">Hotel Owner</option>
                        </select>
                    </div>
                    <button type="submit" >Register</button>
                </form>
                <h6>
                    Already have an Account? <Link to="/Login">Sign in here</Link>
                </h6>
            </div>
        </div>
    );
}

export default Registration;
