import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import "../Reviews/Review.css";
import ConfirmBox from "../ConfirmDelete/ConfirmDelete";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [hotelNames, setHotelNames] = useState({});
  const [error, setError] = useState(null);

  var username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5108/api/User/${username}/reviews`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user reviews");
        }
        const data = await response.json();
        if (Array.isArray(data.$values)) {
          setReviews(data.$values);
          fetchHotelNames(data.$values);
        } else {
          setReviews([]);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserReviews();
  }, [username]);

  const fetchHotelNames = async (reviews) => {
    try {
      const uniqueHotelIds = [
        ...new Set(reviews.map((review) => review.hotelId)),
      ];
      const names = {};
      for (const hotelId of uniqueHotelIds) {
        const response = await fetch(
          `http://localhost:5108/api/Hotel/GetById?id=${hotelId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }
        const data = await response.json();
        names[hotelId] = data.name;
      }
      setHotelNames(names);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteReview = (reviewId) => {
    confirmDelete(reviewId); // Pass reviewId directly to confirmDelete
  };

  const confirmDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Review/DeleteReview?id=${reviewId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setReviews(reviews.filter((review) => review.reviewId !== reviewId)); // Update reviews after deletion
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditRating = async (reviewId, newRating) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Review/UpdateRating?id=${reviewId}&rating=${newRating}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update rating");
      }
      const updatedReviews = reviews.map((review) => {
        if (review.reviewId === reviewId) {
          return { ...review, rating: newRating };
        }
        return review;
      });
      setReviews(updatedReviews);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-reviews-container">
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.reviewId} className="review-item">
            <p className="review-rating">
              Rating :
              <Rating
                initialRating={review.rating}
                onChange={(newRating) =>
                  handleEditRating(review.reviewId, newRating)
                }
                emptySymbol={<i className="ri-star-line"></i>}
                fullSymbol={<i className="ri-star-fill"></i>}
              />
            </p>
            <p className="review-comment">Comment: {review.comment}</p>
            <p className="hotel-name">Hotel: {hotelNames[review.hotelId]}</p>
            <div className="review-buttons">
              <ConfirmBox
                confirmVar="Delete Review"
                onConfirm={() => handleDeleteReview(review.reviewId)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviews;
