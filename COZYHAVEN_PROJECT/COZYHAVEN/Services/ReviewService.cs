using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Mappers;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;

namespace CozyHaven.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IRepository<int, Review> _repository;

        public ReviewService(IRepository<int,Review> repository)
        {
            _repository=repository;
        }
        public async Task<Review> AddReview(ReviewDTO review)
        {
            Review newreview = ReviewMapping.MapReviewDTOToEntity(review);
            return await _repository.Add(newreview);
        }

        public async Task<Review> DeleteReview(int id)
        {
            var review=await GetReview(id);
            if(review!=null)
            {
                await _repository.Delete(id);
                return review;
            }
            throw new ReviewNotFoundException();
        }

        public Task<List<Review>> GetAllReviews()
        {
            var reviews=_repository.GetAll();
            if(reviews!=null) return reviews;
            throw new ReviewNotFoundException();
        }

        public Task<Review> GetReview(int id)
        {
            var review=_repository.GetById(id);
            if (review != null) return review;
            throw new ReviewNotFoundException();
        }

        public async Task<Review> UpdateReviewRating(int id, float rating)
        {
            var hotel=await GetReview(id);
            if(hotel!=null)
            {
                hotel.Rating=rating;
                await _repository.Update(hotel);
                return hotel;
            }
            throw new ReviewNotFoundException();
        }
    }
}
