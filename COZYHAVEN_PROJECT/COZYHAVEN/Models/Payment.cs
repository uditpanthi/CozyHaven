using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace CozyHaven.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }

        [Required]
        public float Amount { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        [Required]
        public PaymentStatus Status { get; set; } 

        // Navigation property
        public Reservation? Reservation { get; set; } 
    }
    public enum PaymentStatus
    {
        Pending,
        Approved,
        Cancelled
    }
}

