import React from 'react';
import axios from 'axios';

const BookingCard = ({ booking, onStatusChange }) => {
  const handleStatusUpdate = async (newStatus) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/bookings/${booking.id}`, { status: newStatus });
      if (res.data.success) {
        alert(`Booking ${newStatus}`);
        onStatusChange(); // refresh parent list
      }
    } catch (error) {
      alert('Failed to update booking status.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8, marginBottom: 10 }}>
      <h3>Booking ID: {booking.id}</h3>
      <p><strong>User ID:</strong> {booking.userId}</p>
      <p><strong>Hotel ID:</strong> {booking.hotelId}</p>
      <p><strong>Room Type:</strong> {booking.roomType}</p>
      <p><strong>Check-in:</strong> {booking.checkIn}</p>
      <p><strong>Check-out:</strong> {booking.checkOut}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      {booking.status === 'PENDING' && (
        <div>
          <button onClick={() => handleStatusUpdate('APPROVED')} style={{ marginRight: 10, color: 'green' }}>
            Approve
          </button>
          <button onClick={() => handleStatusUpdate('REJECTED')} style={{ color: 'red' }}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
