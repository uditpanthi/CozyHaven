import React, { useState, useEffect } from "react";
import "./HotelReview.css";import Slider from "react-slick";
import Rating from "react-rating";
;

const HotelReviews = ({ hotelId }) => {
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5108/api/Hotel/HotelReviews?id=${hotelId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        // Sort the reviews by datePosted in descending order
        const sortedReviews = data.$values.sort((a, b) => {
          return new Date(b.datePosted) - new Date(a.datePosted);
        });
        setReviews(sortedReviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [hotelId]);

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:5108/api/User/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          [userId]: userData,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Fetch user details for each reservation
    reviews.forEach((reviews) => {
      if (!userDetails[reviews.userId]) {
        fetchUserDetails(reviews.userId);
      }
    });
  }, [reviews, userDetails]);

  return (
    <div className="hotel-reviews-container">
      <h4>Hotel Reviews</h4>
        <br />
      <ul>
      {reviews.length > 0 && (
            <div className="reviews-list">
              <p>Total {reviews.length} Reviews</p>
              <Slider {...settings} className="review-info">
                {reviews.map((review, index) => (
                  <div className="review" key={index}>
                    <p className="comment">{review.comment}</p>
                    <Rating
                      initialRating={review.rating}
                      emptySymbol={<i className="ri-star-line"></i>}
                      fullSymbol={<i className="ri-star-fill"></i>}
                      readonly
                    />
                    <p>
                      date: {new Date(review.datePosted).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          )}
      </ul>
    </div>
  );
};

export default HotelReviews;
