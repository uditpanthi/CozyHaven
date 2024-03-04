using CozyHaven.Exceptions;
using CozyHaven.Interfaces;
using CozyHaven.Mappers;
using CozyHaven.Models;
using CozyHaven.Models.DTOs;
using CozyHaven.Services;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace COZYHAVENTEST
{
    [TestFixture]
    public class ReviewServiceTest
    {
        private Mock<IRepository<int, Review>> _mockRepository;
        private IReviewService _reviewService;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IRepository<int, Review>>();
            _reviewService = new ReviewService(_mockRepository.Object);
        }

        [Test]
        public async Task AddReview_ValidReviewDTO_ReturnsAddedReview()
        {
            // Arrange
            var reviewDTO = new ReviewDTO();
            var review = new Review();
            _mockRepository.Setup(repo => repo.Add(It.IsAny<Review>())).ReturnsAsync(review);

            // Act
            var result = await _reviewService.AddReview(reviewDTO);

            // Assert
            Assert.IsNotNull(result);
        }

        [Test]
        public async Task DeleteReview_ExistingReviewId_ReturnsDeletedReview()
        {
            // Arrange
            var reviewId = 1;
            var review = new Review();
            _mockRepository.Setup(repo => repo.GetById(reviewId)).ReturnsAsync(review);
            _mockRepository.Setup(repo => repo.Delete(reviewId)).ReturnsAsync(review); 

            // Act
            var result = await _reviewService.DeleteReview(reviewId);

            // Assert
            Assert.IsNotNull(result);
        }


        [Test]
        public void GetAllReviews_ReturnsListOfReviews()
        {
            // Arrange
            var reviews = new List<Review>();
            _mockRepository.Setup(repo => repo.GetAll()).ReturnsAsync(reviews);

            // Act & Assert
            Assert.DoesNotThrowAsync(async () => await _reviewService.GetAllReviews());
        }

        [Test]
        public void GetReview_ExistingReviewId_ReturnsReview()
        {
            // Arrange
            var reviewId = 1;
            var review = new Review();
            _mockRepository.Setup(repo => repo.GetById(reviewId)).ReturnsAsync(review);

            // Act & Assert
            Assert.DoesNotThrowAsync(async () => await _reviewService.GetReview(reviewId));
        }

        [Test]
        public async Task UpdateReviewRating_ExistingReviewId_ReturnsUpdatedReview()
        {
            // Arrange
            var reviewId = 1;
            var rating = 4.5f;
            var review = new Review { ReviewId = reviewId };
            _mockRepository.Setup(repo => repo.GetById(reviewId)).ReturnsAsync(review);
            _mockRepository.Setup(repo => repo.Update(review)).ReturnsAsync(review);

            // Act
            var result = await _reviewService.UpdateReviewRating(reviewId, rating);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Rating, Is.EqualTo(rating));
        }
    }
}
