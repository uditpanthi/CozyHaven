import "./LandingPage.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import BrowsePage from "../BrowsePage/BrowsePage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";

const LandingPage = () => {
  // useEffect(()=>{
  //   Navigation();
  // },[]);
  useEffect(() => {
    CursorAnimation();
  }, []);
  
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // GSAP animation for navigation bar
    

    // GSAP animation for '.main' element
    gsap.to(".main", {
      backgroundColor: "#000",
      scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2,
      },
    });

    // GSAP animation for '.card' elements
    // gsap.from(".card", {
    //   scale: 0.8,
    //   duration: 1,
    //   stagger: 0.1,
    //   scrollTrigger: {
    //     trigger: ".card",
    //     scroller: "body",
    //     start: "top 70%",
    //     end: "top 65%",
    //     scrub: 1,
    //   },
    // });

    // GSAP animation for '#colon1' element
    gsap.from("#colon1", {
      y: -70,
      x: -70,
      scrollTrigger: {
        trigger: "#colon1",
        scroller: "body",
        start: "top 55%",
        end: "top 45%",
        scrub: 4,
      },
    });

    // GSAP animation for '#colon2' element
    gsap.from("#colon2", {
      y: 70,
      x: 70,
      scrollTrigger: {
        trigger: "#colon1",
        scroller: "body",
        start: "top 55%",
        end: "top 45%",
        scrub: 4,
      },
    });

    // GSAP animation for '#page4 h1' element
    gsap.from("#page4 h1", {
      y: 50,
      scrollTrigger: {
        trigger: "#page4 h1",
        scroller: "body",
        start: "top 75%",
        end: "top 70%",
        scrub: 3,
      },
    });

    // Clean up when unmounting the component
    // return () => {
    //   // Kill any ongoing animations
    //   gsap.killTweensOf(".main");
    //   gsap.killTweensOf("#about-us img,#about-us-in");
    //   gsap.killTweensOf(".card");
    //   gsap.killTweensOf("#colon1");
    //   gsap.killTweensOf("#colon2");
    //   gsap.killTweensOf("#page4 h1");
    // };
  }, []);
  

  return (
    <div className="main">
      <video
        autoPlay
        loop
        muted
        src={process.env.PUBLIC_URL + "/hotel vid.mp4"}
      ></video>
      <Navigation />
      
      <div id="cursor-blur"></div>
      {/* <div id="cursor"></div> */}
      <div id="page1">
        <h1>book.stay.smile</h1>
        <h2>
          At <span>cozy haven</span> we've simplified the art of travel into
          three simple steps: Book your ideal stay effortlessly, experience a
          delightful and comfortable stay at our curated accommodations, and
          leave with a smile of satisfaction.
        </h2>
        <br />
        <br />
        <br />
        <br />

      <SearchBar/>  
      
      </div>
      <div id="page2">
        <div id="scroller">
          <div id="scroller-in">
            <h4>HOTELS </h4>
            <h4>RESTAURANTS </h4>
            <h4>PRIVATE STAYS </h4>
            <h4>RESORTS </h4>
          </div>
          <div id="scroller-in">
            <h4>HOTELS </h4>
            <h4>RESTAURANTS </h4>
            <h4>PRIVATE STAYS </h4>
            <h4>RESORTS </h4>
          </div>
        </div>
        <div id="about-us">
          <div id="about-us-in">
            <h3>ABOUT US</h3>
            <p>
              we've simplified the art of travel into three simple steps: Book
              your ideal stay effortlessly, experience a delightful and
              comfortable stay at our curated accommodations, and leave with a
              smile of satisfaction.
            </p>
          </div>
        </div>
        <div id="cards-container">
          <Link to={'/browsepage?location=Mumbai'}>
            <div className="card" id="card1">
              <div class="overlay">
                <h4>Mumbai</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                  quam molestias magni cupiditate architecto et enim quas facere
                  ipsum tempora?
                </p>
              </div>
            </div>
          </Link>
          <Link to={'/browsepage?location=Delhi'}>
            <div class="card" id="card2">
              <div class="overlay">
                <h4>Delhi</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                  quam molestias magni cupiditate architecto et enim quas facere
                  ipsum tempora?
                </p>
              </div>
            </div>
          </Link>
          <Link to={'/browsepage?location=Dehradun'}>
            <div class="card" id="card3">
              <div class="overlay">
                <h4>Uttarakhand</h4>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                  quam molestias magni cupiditate architecto et enim quas facere
                  ipsum tempora?
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div id="green-div">
          <img
            src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/dots-side.svg"
            alt=""
          />
          <h4>
            SIGN UP FOR EXCITING NEWS AND SPECIAL OFFERS STRAIGHT TO YOUR INBOX
          </h4>
          <img
            src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/dots-side.svg"
            alt=""
          />
        </div>
      </div>
      <div id="page3">
        <p>
          we've simplified the art of travel into three simple steps: Book your
          ideal stay effortlessly, experience a delightful and comfortable stay
          at our curated accommodations, and leave with a smile of satisfaction.
        </p>
        <img
          id="colon1"
          src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/quote-left.svg"
          alt=""
        />
        <img
          id="colon2"
          src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/quote-right.svg"
          alt=""
        />
      </div>
      <div id="page4">
        <h1>WHAT ARE YOU WAITING FOR?</h1>
        <div class="elem">
          <h2>ENJOY WITH FAMILY</h2>
          <img src="" alt="" />
        </div>
        <div class="elem">
          <h2>BUDGET TRAVEL</h2>
          <img src="../../../public/budget-travel.jpg" alt="" />
        </div>
        <div class="elem">
          <h2>VISIT NEW PLACES</h2>
          <img src="../../../public/destinations-2.jpg" alt="" />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;