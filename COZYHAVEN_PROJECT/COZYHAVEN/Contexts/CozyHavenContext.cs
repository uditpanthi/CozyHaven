
using CozyHaven.Models;
using Microsoft.EntityFrameworkCore;
using static System.Net.WebRequestMethods;

namespace CozyHaven.Contexts
{
    public class CozyHavenContext:DbContext
    {
        public CozyHavenContext(DbContextOptions options):base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }

        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Amenity> Amenities { get; set; }
        
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Review> Reviews { get; set; }

        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
            {
                UserId = 1,
                Username = "john_doe",
                FirstName = "John",
                LastName = "Doe",
                DateofBirth = new DateTime(1990, 1, 1),
                Email = "john@example.com",
                ContactNumber = "1234567890",
                Password = new byte[] { }, // Your hashed password here
                Key = new byte[] { }, // Your encryption key here
                UserType = UserType.HotelOwner,
                RegistrationDate = DateTime.Now
            },
                new User
                {
                    UserId = 2,
                    Username = "jane_smith",
                    FirstName = "Jane",
                    LastName = "Smith",
                    DateofBirth = new DateTime(1985, 5, 15),
                    Email = "jane@example.com",
                    ContactNumber = "9876543210",
                    Password = new byte[] { }, // Your hashed password here
                    Key = new byte[] { }, // Your encryption key here
                    UserType = UserType.Admin,
                    RegistrationDate = DateTime.Now
                }
            );

            modelBuilder.Entity<Room>().HasData(
                new Room
                {
                    RoomId = 1,
                    HotelId = 1, // Assuming Hotel with Id = 1 exists
                    RoomSize = 30.5f,
                    RoomType = "Standard",
                    PricePerNight = 100.0f,
                    Capacity = 2,
                    ImageURLs = new List<string> { "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                    Available = true
                },
                new Room
                {
                    RoomId = 2,
                    HotelId = 2, // Assuming Hotel with Id = 2 exists
                    RoomSize = 40.0f,
                    RoomType = "Deluxe",
                    PricePerNight = 150.0f,
                    Capacity = 3,
                    ImageURLs = new List<string> { "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                    Available = true
                }
            );

            modelBuilder.Entity<Review>().HasData(new Review
            {
                ReviewId = 1,
                HotelId = 1, // Assuming Hotel with Id = 1 exists
                UserId = 1, // Assuming User with Id = 1 exists
                Rating = 4.5f,
                Comment = "Great experience!",
                DatePosted = DateTime.Now
            },
                new Review
                {
                    ReviewId = 2,
                    HotelId = 2, // Assuming Hotel with Id = 2 exists
                    UserId = 2, // Assuming User with Id = 2 exists
                    Rating = 5.0f,
                    Comment = "Excellent service!",
                    DatePosted = DateTime.Now
                }
            );
            modelBuilder.Entity<Reservation>().HasData(
                new Reservation
                {
                    ReservationId = 1,
                    UserId = 1, // Assuming User with Id = 1 exists
                    RoomId = 1, // Assuming Room with Id = 1 exists
                    CheckInDate = DateTime.Today,
                    CheckOutDate = DateTime.Today.AddDays(2),
                    Adults = 2,
                    Children = 0,
                    TotalPrice = 250.0f,
                    Status = BookingStatus.Approved,
                    BookedDate = DateTime.Now
                }
            );
            modelBuilder.Entity<Payment>().HasData(new Payment
            {
                PaymentId = 1,
                ReservationId = 1, // Assuming Reservation with Id = 1 exists
                Amount = 250.0f,
                PaymentDate = DateTime.Now,
                PaymentMethod = "Credit Card",
                Status = PaymentStatus.Approved
            }
           );
            modelBuilder.Entity<Hotel>().HasData(new Hotel
            {
                HotelId = 1,
                OwnerId = 1, 
                Name = "Cozy Inn",
                Address = "123 Main Street",
                City = "Example City",
                NumberOfRooms = 20,
                Description = "A cozy place to stay.",
                ImageURLs = new List<string> { "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                prePrice = 2000,
                StartingPrice = 1000,
            },
                new Hotel
                {
                    HotelId = 2,
                    OwnerId = 1, 
                    Name = "Luxury Resort",
                    Address = "456 Elm Street",
                    City = "Another City",
                    NumberOfRooms = 10,
                    Description = "Experience luxury at its finest.",
                    ImageURLs = new List<string> { "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://plus.unsplash.com/premium_photo-1661843652801-66305e3c980c?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                    prePrice = 3000,
                    StartingPrice = 1500,
                }
            );

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hotel>()
                .Property(h => h.ImageURLs)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
            
            modelBuilder.Entity<Room>()
                .Property(h => h.ImageURLs)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

            modelBuilder.Entity<Review>().HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Review>().HasOne(r => r.Hotel)
                .WithMany(h => h.Reviews)
                .HasForeignKey(r => r.HotelId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Reservation>().HasOne(b => b.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Reservation>().HasOne(b => b.Room)
                .WithMany(r => r.Reservations)
                .HasForeignKey(b => b.RoomId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Hotel>().HasOne(h => h.Owner)
                .WithMany(u => u.Hotels)
                .HasForeignKey(h => h.OwnerId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<HotelAmenity>()
            .HasKey(ha => new { ha.HotelId, ha.AmenityId });

            modelBuilder.Entity<HotelAmenity>()
                .HasOne(ha => ha.Hotel)
                .WithMany(h => h.HotelAmenities)
                .HasForeignKey(ha => ha.HotelId);

            modelBuilder.Entity<HotelAmenity>()
                .HasOne(ha => ha.Amenity)
                .WithMany(a => a.HotelAmenity)
                .HasForeignKey(ha => ha.AmenityId);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.HasIndex(u => u.Email)
                      .IsUnique();
                entity.HasIndex(u => u.Username)
                .IsUnique();
            });

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("float")
                .HasPrecision(10, 2); // 10 is the maximum number of digits, 2 is the number of decimal places

            modelBuilder.Entity<Reservation>()
                .Property(r => r.TotalPrice)
                .HasColumnType("float")
                .HasPrecision(10, 2);

            modelBuilder.Entity<Room>()
                .Property(r => r.PricePerNight)
                .HasColumnType("float")
                .HasPrecision(10, 2);

            CozyHavenContext.Seed(modelBuilder);
        }
    }
}
