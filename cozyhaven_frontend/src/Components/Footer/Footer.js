import React from "react";
import '../Footer/Footer.css';

const Footer = () => {
  return (
    <div>
      <div id="footer">
        <img
          src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/dots-footer.svg"
          alt="Decorative Dots"
        />
        <div id="f1">
          <h3>CozyHaven</h3>
          <div id="socials">
            <i className="ri-instagram-fill"></i>
            <i className="ri-facebook-fill"></i>
            <i className="ri-twitter-x-fill"></i>
          </div>
        </div>
        <div id="f2">
          <h3>
            <a href="/about">About Us</a>
          </h3>
          <h3>
            <a href="/terms">Our Terms</a>
          </h3>
          <h3>
            <a href="/careers">Careers</a>
          </h3>
          <h3>
            <a href="/mission">Mission and Values</a>
          </h3>
        </div>
        <div id="f3">
          <h3>
            <a href="/faq">FAQ</a>
          </h3>
          <h3>
            <a href="/booking-guide">Booking Guide</a>
          </h3>
          <h3>
            <a href="/blog">Blog</a>
          </h3>
          <h3>
            <a href="/contact">Contact Us</a>
          </h3>
        </div>
        <div id="f4">
          <h4>
            <a href="/terms-conditions">Terms & Conditions</a>
          </h4>
          <h4>
            <a href="/privacy-policy">Privacy Policy</a>
          </h4>
        </div>
        <div id="f5">
          <a href="https://linkedin.com">
            <i className="fa fa-linkedin-square"></i>
          </a>
          <a href="https://facebook.com">
            <i className="fa fa-facebook-square"></i>
          </a>
          <a href="https://twitter.com">
            <i className="fa fa-twitter-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
