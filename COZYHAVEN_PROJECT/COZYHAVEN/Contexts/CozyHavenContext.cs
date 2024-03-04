
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
        public DbSet<HotelAmenity> HotelAmenities { get; set; }

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
                Password = new byte[] { }, 
                Key = new byte[] { }, 
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
                    Password = new byte[] { }, 
                    Key = new byte[] { }, 
                    UserType = UserType.Admin,
                    RegistrationDate = DateTime.Now
                }
            );

            modelBuilder.Entity<Room>().HasData(
        new Room
        {
            RoomId = 1,
            HotelId = 1,
            RoomSize = 30,
            RoomType = "Standard",
            PricePerNight = 100,
            ImageURLs = new List<string>
            {
                "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            Capacity = 2,
            Available = true
        },
        new Room
        {
            RoomId = 2,
            HotelId = 2,
            RoomSize = 40,
            RoomType = "Deluxe",
            PricePerNight = 150,
            ImageURLs = new List<string>
            {
                "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            Capacity = 3,
            Available = true
        },
        new Room
        {
            RoomId = 3,
            HotelId = 3,
            RoomSize = 30,
            RoomType = "luxury",
            PricePerNight = 1080,
            ImageURLs = new List<string>
            {
                "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            Capacity = 10,
            Available = true
        },
        new Room
        {
            RoomId = 4,
            HotelId = 3,
            RoomSize = 15,
            RoomType = "Standard",
            PricePerNight = 953,
            ImageURLs = new List<string>
            {
                "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1661923086373-73176f7c004a?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            Capacity = 5,
            Available = true
        }
    );

            modelBuilder.Entity<Review>().HasData(new Review
            {
                ReviewId = 1,
                HotelId = 1, 
                UserId = 1, 
                Rating = 4.5f,
                Comment = "Great experience!",
                DatePosted = DateTime.Now
            },
                new Review
                {
                    ReviewId = 2,
                    HotelId = 2, 
                    UserId = 2,
                    Rating = 5.0f,
                    Comment = "Excellent service!",
                    DatePosted = DateTime.Now
                }
            );
            modelBuilder.Entity<Reservation>().HasData(
                new Reservation
                {
                    ReservationId = 1,
                    UserId = 1, 
                    RoomId = 1, 
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
                ReservationId = 1, 
                Amount = 250.0f,
                PaymentDate = DateTime.Now,
                PaymentMethod = "Credit Card",
                Status = PaymentStatus.Approved
            }
           );
            modelBuilder.Entity<Hotel>().HasData(
        new Hotel
        {
            HotelId = 1,
            OwnerId = 1,
            Name = "Cozy Inn",
            Address = "123 Main Street",
            City = "Example City",
            Description = "The car parking and the Wi-Fi are always free, so you can stay in touch and come and go as you please. Strategically situated in Malsi, allowing you access and proximity to local attractions and sights. Don't leave before paying a visit to the famous Jolly Grant Airport. Rated with 4 stars, this high-quality property provides guests with access to restaurant and fitness center on-site.",
            ImageURLs = new List<string>
            {
                "https://plus.unsplash.com/premium_photo-1670360414903-19e5832f8bc4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            NumberOfRooms = 20,
            prePrice = 2000,
            StartingPrice = 1000
        },
        new Hotel
        {
            HotelId = 2,
            OwnerId = 1,
            Name = "Luxury Resort",
            Address = "456 Elm Street",
            City = "Another City",
            Description = "The car parking and the Wi-Fi are always free, so you can stay in touch and come and go as you please. Strategically situated in Khurbura Mohalla, allowing you access and proximity to local attractions and sights. Don't leave before paying a visit to the famous Jolly Grant Airport. This 4-star property features restaurant to make your stay more indulgent and memorable.",
            ImageURLs = new List<string>
            {
                "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1661843652801-66305e3c980c?q=80&w=2037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            NumberOfRooms = 10,
            prePrice = 3000,
            StartingPrice = 1500
        },
        new Hotel
        {
            HotelId = 3,
            OwnerId = 1,
            Name = "PP Resort",
            Address = "4 Rajnikunj",
            City = "Dehradun",
            Description = "A perfect value for money place, middle of shopping paradise. Very spacious rooms, courteous staff, free parking and above all very tasty food. Though the hotel is slightly outside the main city periphery but still it offers convenient access to it with all key facilities around., whether steer good, bar or lounges, pacific mall etc. overall my family loves the stay in Lemon Tree Dehradun.",
            ImageURLs = new List<string>
            {
                "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            NumberOfRooms = 50,
            prePrice = 2000,
            StartingPrice = 500
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
                .HasPrecision(10, 2); 

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
