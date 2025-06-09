import { useState, useEffect } from 'react';
import {
  bookHotel, getBookingsUser, getHotels
} from '../services/api';
import "../styles/UserDashboard.css"

const fallbackImage = 'https://via.placeholder.com/200x150?text=No+Image';

const imageMap = {
  1: 'https://th.bing.com/th/id/OIP.wMnuOgf0yXzDm_430jljmgHaD5?w=294&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  2: 'https://www.bing.com/th/id/OIP.6tEokJ3OiDWyZEtydQb4MQHaFj?w=254&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2',
  3: 'https://www.bing.com/th/id/OIP.KGuRfbrIg5SoY92BTuGb2gHaHa?w=191&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2',
  4: 'https://media2.thrillophilia.com/images/photos/000/227/982/original/1586895164_cascade2.png',
  5: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/509804551.jpg?k=57a853541c82f1477a3f14c661d5e144bc6ddfdc4c79970b278e526fa0867e38&o=&hp=1',
  6: 'https://th.bing.com/th/id/OIP.hNWH6010g5CVBuCuict75wHaE8?r=0&rs=1&pid=ImgDetMain',
  7: 'https://static.toiimg.com/thumb/msid-89349993,width-748,height-499,resizemode=4,imgsize-171094/Snow-Peak-Retreat-and-Cottages-Manali.jpg',
  8: 'https://th.bing.com/th/id/OIP.P7Xj7OFyOJUvk6mLZwgUewHaEx?r=0&rs=1&pid=ImgDetMain',
  9: 'https://gos3.ibcdn.com/kk-royal-hotel-and-lotus-convention-centre-jaipur-facade2-41810930g.jpg',
  10: 'https://th.bing.com/th/id/OIP.1Uskt-UGeNJ5tBdXGY6_IwHaE8?r=0&rs=1&pid=ImgDetMain',
  11: 'https://is1-3.housingcdn.com/4f2250e8/d3507a33027b73e8dd29b4950cf997e7/v5/fs/ncc_nagarjuna_residency-gachibowli-hyderabad-ncc_urban_infrastructure_limited.jpg'
};

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [hotels, setHotels] = useState([]);
  const [booking, setBooking] = useState({ hotelId: null, userId: user.id, roomType: '', checkIn: '', checkOut: '', roomNumber: '' });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getHotels({}).then(res => {
      // Add imageUrl to each hotel based on its ID
      const hotelsWithImages = res.data.map(hotel => ({
        ...hotel,
        imageUrl: imageMap[hotel.id] || fallbackImage
      }));
      setHotels(hotelsWithImages);
    });
    getBookingsUser(user.id).then(res => setBookings(res.data));
  }, [user.id]);

  const handleBookClick = (hotel) => {
    setBooking({
      hotelId: hotel.id,
      userId: user.id,
      name: user.name,
      roomType: hotel.roomType,
      checkIn: '',
      checkOut: '',
      roomNumber: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await bookHotel(booking);
    setBookings(await getBookingsUser(user.id).then(r => r.data));
  };

  return (
    <div className="user-dashboard">
      <h2>Welcome, {user.name}</h2>

      <h3>Hotels</h3>
      <div className="user-dashboard__hotel-list">
        {hotels.map(hotel => (
          <div key={hotel.id} className="user-dashboard__hotel-card">
            <img
              className="user-dashboard__hotel-image"
              src={hotel.imageUrl}
              alt={hotel.name}
              width="200"
              onError={(e) => e.target.src = fallbackImage}
            />
            <b>{hotel.name}</b> - {hotel.location}<br />
            Room Type: {hotel.roomType}, Price: ₹{hotel.price}<br />
            <button className="btn-book" onClick={() => handleBookClick(hotel)}>Book</button>
          </div>
        ))}
      </div>

      {booking.hotelId && (
        <>
          <h3>Book Selected Hotel</h3>
          <form onSubmit={handleSubmit} className="user-dashboard__booking-form">
            <input
              type="date"
              required
              className="user-dashboard__input"
              onChange={e => setBooking(b => ({ ...b, checkIn: e.target.value }))}
            />
            <input
              type="date"
              required
              className="user-dashboard__input"
              onChange={e => setBooking(b => ({ ...b, checkOut: e.target.value }))}
            />
            <select
              required
              className="user-dashboard__input"
              onChange={e => setBooking(b => ({ ...b, roomNumber: e.target.value }))}
            >
              <option value="">Select Room Number</option>
              {[...Array(10)].map((_, i) => <option key={i + 1}>{i + 1}</option>)}
            </select>
            <button type="submit" className="btn-book-submit">Place Booking</button>
          </form>
        </>
      )}

      <h3>Your Bookings</h3>
      {bookings.map(bk => (
        <div key={bk.id}>
          <b>{bk.id}</b>: Hotel {bk.hotelName || bk.hotelId}, {bk.roomType}, Room {bk.roomNumber}, {bk.status}
        </div>
      ))}
    </div>
  );
}