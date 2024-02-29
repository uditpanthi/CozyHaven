import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import "../Reviews/Review.css";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [hotelNames, setHotelNames] = useState({});
  const [error, setError] = useState(null);
  const [confirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

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

  const handleDeleteReview = async (reviewId) => {
    setReviewIdToDelete(reviewId);
    setConfirmationBoxVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/Review/DeleteReview?id=${reviewIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setReviews(reviews.filter((review) => review.reviewId !== reviewIdToDelete));
      setConfirmationBoxVisible(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelDelete = () => {
    setConfirmationBoxVisible(false);
    setReviewIdToDelete(null);
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
      {/* <h2>User Reviews</h2> */}
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
              <button
                className="delete-button"
                onClick={() => handleDeleteReview(review.reviewId)}
              >
                Delete Review
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Confirmation box */}
      {confirmationBoxVisible && (
        <div className="confirmation-box">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this review?</p>
          <div className="confirmation-box-buttons">
            <button className="confirm-button" onClick={confirmDelete}>Delete</button>
            <button className="cancel-button" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
