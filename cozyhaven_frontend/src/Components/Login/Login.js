import React, { useEffect, useState } from "react";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import LandingPage from "../Landing Page/LandingPage";
import OwnerDashboard from "../OwnerDashboard/OwnerDashboard";
import AdminDashboard from "../AdminDashboard/Admindashboard";

const Login = () => {
  useEffect(() => {
    CursorAnimation();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const login = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      role: "",
      token: "",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    setLoading(true);

    fetch("http://localhost:5108/api/User/Login", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("username", res.username);
        sessionStorage.setItem("role", res.role);
        // alert("Login success - " + res.username);
        setLoggedin(true);
        setRole(res.role);
      })
      .catch((err) => {
        console.log(err);
        setLoggedin(false);
        setLoginError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    loggedin ? (
      role === "user" ? <LandingPage /> :
      role === "HotelOwner" ? <OwnerDashboard /> :
      role === "admin" && <AdminDashboard />
    ) : (
      <div id="login-page">
        <div id="cursor-blur"></div>
        <h2>Login to Cozy havens</h2>
        <div id="login-form">
          <form onSubmit={login}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <button type="submit" id="Login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <br />
          {loginError && <div>Login Failed. Retry</div>}
          <br />
          <h6>
            No account? <Link to="/register">Sign up here</Link>
          </h6>
        </div>
      </div>
    )
  );
};

export default Login;
