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
import budget from "../../Assets/budget-travel.jpg";
import destinations from "../../Assets/destinations-1.jpg";
import family from "../../Assets/family.jpg";

const LandingPage = () => {
  // useEffect(()=>{
  //   Navigation();
  // },[]);
  useEffect(() => {
    CursorAnimation();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".main", {
      backgroundColor: "#000",
      scrollTrigger: {
        trigger: ".main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2,
      },
    });

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

        <SearchBar />
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
          <Link to={"/browsepage?location=Mumbai"}>
            <div className="card" id="card1">
              <div className="overlay">
                <h4>Mumbai</h4>
                <p>
                  Bam bam bam bambai Bambai humko zam gayi. Dekh ke ie bambai ka
                  Nazara dil ki dhadkan tham gayi
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/browsepage?location=Delhi"}>
            <div className="card" id="card2">
              <div className="overlay">
                <h4>Delhi</h4>
                <p>
                  Basti hai mastaano ki dilli dilli, Gali hai deewano ki dilli 6
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/browsepage?location=Dehradun"}>
            <div className="card" id="card3">
              <div className="overlay">
                <h4>Uttarakhand</h4>
                <p>
                  MAI DEVON KI HUN NAGRI SE, BAWA KI NAGRI YE, HAWA MEIN BEHTA
                  HAR VISHAY, AY DEVI! HAI SWAAGAT DEV NAGRI MEIN MAI
                  DEKHUN TAAREY BAITHA PARWATON SE GARDISH MEIN YA
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
        <div className="elem">
          <h2>ENJOY WITH FAMILY</h2>
          <img src={family} alt="" />
        </div>
        <div className="elem">
          <h2>BUDGET TRAVEL</h2>
          <img src={budget} alt="" />
        </div>
        <div className="elem">
          <h2>VISIT NEW PLACES</h2>
          <img src={destinations} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
