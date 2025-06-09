import { useState, useEffect } from 'react';
import { getHotels } from '../services/api';
import HotelCard from '../components/HotelCard';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({ roomType: '', location: '', price: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getHotels(filters).then(res => setHotels(res.data));
  }, [filters]);

  const handleBook = (hotelId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      const confirmRedirect = window.confirm("You must be logged in to book. Do you want to login?");
      if (confirmRedirect) {
        navigate('/login');
      } else {
        navigate('/signup');
      }
      return;
    }

    navigate('/user', { state: { hotelId } });
  };


return (
  <div className="home-container">
    <div className="navbar">
      <div className="navbar-buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Signup</button>
      </div>
    </div>

    <div className="home-content">
      <h1 className="home-title">Hotel Reservation System</h1>
      <p className="home-description">
        Discover your perfect stay – explore top-rated hotels, filter by your needs, and book in seconds.
      </p>

      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Browse Hotels</h2>

      <div className="filters">
        <input
          placeholder="Room Type"
          onChange={e => setFilters({ ...filters, roomType: e.target.value })}
        />
        <input
          placeholder="Location"
          onChange={e => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          placeholder="Max Price"
          type="number"
          onChange={e => setFilters({
            ...filters,
            price: e.target.value ? +e.target.value : ''
          })}
        />
      </div>

      <div className="hotel-list">
        {hotels.length > 0 ? (
          hotels.map(h => <HotelCard key={h.id} hotel={h} onBook={handleBook} />)
        ) : (
          <p className="no-hotels">No hotels found matching filters.</p>
        )}
      </div>
    </div>
  </div>
);
}