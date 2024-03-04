import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Navigation/Navigation.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navigation = () => {

  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("#nav", {
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
    return () => {
      gsap.killTweensOf("#nav");;
    };

  })

  // Retrieve user information from session storage
  const isLoggedIn = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    // Clear session storage on logout
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
  };

  return (
    <>
      <div id="nav">
        <h2>CozyHaven</h2>
        <div id="nav-buttons">
          {isLoggedIn && (role === "Admin" || role === "HotelOwner") ? null : (
            <>
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
            </>
          )}
        </div>
        <div id="login-signup">
          {isLoggedIn ? (
            <>
              {/* Render user-specific links */}
              <h4>
                <Link to={"/userprofile"}>{sessionStorage.getItem("username")}</Link>
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
      </div>
    </>
  );
};

export default Navigation;
