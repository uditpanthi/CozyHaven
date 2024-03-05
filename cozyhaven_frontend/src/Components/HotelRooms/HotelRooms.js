import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "../HotelRooms/HotelRooms.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Rating from "react-rating";
import { CursorAnimation } from "../CursorAnimation/CursorAnimation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotelRooms = () => {

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
    CursorAnimation();
  }, []);

  const { hotelId } = useParams();

  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
  });

  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (username) {
          const userResponse = await fetch(
            `http://localhost:5108/api/User/GetByUsername?username=${username}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await userResponse.json();
          setUser(userData);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        const [roomsResponse, hotelResponse, reviewResponse] =
          await Promise.all([
            fetch(
              `http://localhost:5108/api/Hotel/GetRoomsByHotelId?hotelId=${hotelId}`
            ),
            fetch(`http://localhost:5108/api/Hotel/GetById?id=${hotelId}`),
            fetch(`http://localhost:5108/api/Hotel/HotelReviews?id=${hotelId}`),
          ]);

        if (!roomsResponse.ok || !hotelResponse.ok || !reviewResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const roomsData = await roomsResponse.json();
        const hotelData = await hotelResponse.json();
        const reviewData = await reviewResponse.json();

        setRooms(roomsData.$values);
        setHotel(hotelData);
        setReviews(reviewData.$values);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHotelAndRooms();
  }, [hotelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value,
    });
  };

  const handleSubmitReview = async () => {
    try {
      if (!user) {
        // If user is not logged in, redirect to the login page
        window.location.href = '/login';
        return;
      }
  
      const response = await fetch(
        "http://localhost:5108/api/Review/AddReview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotelId,
            userId: user.userId,
            rating: reviewForm.rating,
            comment: reviewForm.comment,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add review");
      }
      const updatedReviewResponse = await fetch(
        `http://localhost:5108/api/Hotel/HotelReviews?id=${hotelId}`
      );
      if (!updatedReviewResponse.ok) {
        throw new Error("Failed to fetch updated reviews");
      }
      const updatedReviewData = await updatedReviewResponse.json();
      const sortedReviews = updatedReviewData.$values.sort(
        (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
      );
      setReviews(sortedReviews);
      setReviewForm({
        rating: 0,
        comment: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <>
      <Navigation />
      <div id="cursor-blur"></div>
      <div className="hotelrooms-container">
        <div className="hotel-info">
          {hotel && <h1>Welcome to {hotel.name}</h1>}
        </div>
        <br />
        {hotel && <p>{hotel.description}</p>}
        <br />
        <div className="leftbig-and-rightsml">
          <div className="rooms-list">
            <ul>
              {rooms.map((room) => (
                <li key={room.roomId} className="room-item">
                  <div className="room-details">
                    <div id="img">
                      <Carousel>
                        {room.imageURLs.$values.map((imageUrl, index) => (
                          <div key={index}>
                            <img src={imageUrl} alt={`Room ${room.roomId}`} />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                    <div className="room-info">
                      <p>Room Type: {room.roomType}</p>
                      <p>Room Size: {room.roomSize}</p>
                      <p>Capacity: {room.capacity}</p>
                      <p>Price per Night: {room.pricePerNight}</p>
                      <Link
                        to={`/reservation/${room.roomId}?username=${username}`}
                      >
                        <Button>Book now</Button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br/>
          <br/>
          <h1>Reviews</h1>
          <br/>
          {reviews.length > 0 && (
            <div className="reviews-list">
              <p>Total {reviews.length} Reviews</p>
              <br />
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
        </div>
        <div className="put-review">
          <h2>Add Your Review</h2>
          <form>
            <div>
              <label htmlFor="rating">Rating:</label>
              <Rating
                initialRating={reviewForm.rating}
                emptySymbol={<i className="ri-star-line"></i>}
                fullSymbol={<i className="ri-star-fill"></i>}
                onChange={(value) =>
                  setReviewForm({ ...reviewForm, rating: value })
                }
              />
            </div>
            <div>
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                value={reviewForm.comment}
                onChange={handleInputChange}
              />
            </div>
              <button type="button" onClick={handleSubmitReview}>
                Submit Review
              </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelRooms;
