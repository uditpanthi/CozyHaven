﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;
using System.Text.Json.Serialization;

namespace CozyHaven.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        [Required]
        public int Adults { get; set; }

        [Required]
        public int Children { get; set; }

        [Required]
        public float TotalPrice { get; set; }

        [Required]
        public BookingStatus Status { get; set; } 
        public DateTime BookedDate { get; set; }

        // Navigation properties
        [JsonIgnore]
        public User? User { get; set; }
        [JsonIgnore]
        public Room? Room { get; set; } 
    }
    public enum BookingStatus
    {
        Pending,
        CheckedOut,
        Approved,
        Cancelled
    }
}

