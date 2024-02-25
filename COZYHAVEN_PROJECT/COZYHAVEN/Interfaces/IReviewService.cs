using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Interfaces
{
    public interface IReviewService
    {
        public Task<Review> GetReview(int id);
        public Task<List<Review>> GetAllReviews();
        public Task<Review> AddReview(ReviewDTO review);
        public Task<Review> UpdateReviewRating(int id, float rating);
        public Task<Review> DeleteReview(int id);
        //public Task<List<Review>> GetReviewsByUserId(int userId);
        //public Task<List<Review>> GetReviewsByHotelId(int hotelId);
    }
}
