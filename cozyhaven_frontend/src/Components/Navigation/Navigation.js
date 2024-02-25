import React from "react";
import { Link } from "react-router-dom";
import "../Navigation/Navigation.css";
import gsap from "gsap";

const Navigation = () => {
  gsap.to("nav", {
    backgroundColor: "#000",
    duration: 0.5,
    height: "110px",
    scrollTrigger: {
      trigger: "#nav",
      scroller: "body",
      start: "top -10%",
      end: "top -11%",
      scrub: 1,
    },
  });
  var isLoggedIn = sessionStorage.getItem("token");
  var username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove token from sessionStorage
    sessionStorage.removeItem("username"); // Remove username from sessionStorage
  };

  return (
    <nav>
      <h2>CozyHaven</h2>
      <div id="nav-buttons">
        <h4>
          <Link to="/">Home</Link>
        </h4>
        <h4>
          <Link to="/browsepage">Hotels</Link>
        </h4>
        <h4>
          <a href="#page3">Blog</a>
        </h4>
        <h4>
          <a href="#footer">Contact</a>
        </h4>
      </div>
      <div id="login-signup">
        {isLoggedIn ? (
          <>
            <h4>
            <Link to={'/userprofile'}>
              {username}
            </Link>
            </h4>
            <h4>
              <Link onClick={handleLogout} to={"/"}>
                Logout
              </Link>
            </h4>
          </>
        ) : (
          <>
            <h4>
              <Link to="/login">Login</Link>
            </h4>
            <h4>
              <Link to="/register">Sign Up</Link>
            </h4>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
