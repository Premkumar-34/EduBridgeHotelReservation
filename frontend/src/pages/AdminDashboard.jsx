import { useState, useEffect } from 'react';
import {
  getAllHotels, addHotel, deleteHotel,
  getAllBookings, updateBooking, updateHotel, getUserById
} from '../services/api';
import HotelCard from '../components/HotelCard';
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: '', location: '', imageUrl: '', totalRooms: '', roomType: '', price: '' });
  const [bookings, setBookings] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingHotel, setEditingHotel] = useState(null);

  const fetchData = async () => {
    const [hRes, bRes] = await Promise.all([getAllHotels(), getAllBookings()]);
    setHotels(hRes.data);

    const hotelMap = new Map();
    hRes.data.forEach(h => hotelMap.set(h.id, h.name));

    const enriched = await Promise.all(
      bRes.data.map(async (b) => {
        let user = null;
        try {
          const u = await getUserById(b.userId);
          user = u.data;
        } catch (err) {
          console.error(`Failed to fetch user ${b.userId}`, err);
        }

        return {
          ...b,
          user,
          hotelName: hotelMap.get(b.hotelId) || 'Unknown Hotel'
        };
      })
    );

    setBookings(enriched);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (editingHotel) {
      await updateHotel(editingHotel.id, newHotel);
      setEditingHotel(null);
    } else {
      await addHotel(newHotel);
    }
    setNewHotel({ name: '', location: '', imageUrl: '', totalRooms: 0, roomType: '', price: 0 });
    fetchData();
  };

  const handleEdit = (h) => {
    setEditingHotel(h);
    setNewHotel(h);
  };

  const handleStatus = async (id, status) => {
    await updateBooking(id, status);
    fetchData();
  };

  return (
    <div className="admin-dashboard" style={{ padding: 20 }}>
      <h2 className="admin-dashboard__heading">{editingHotel ? 'Edit Hotel' : 'Add Hotel'}</h2>
      <form className="admin-dashboard__form" onSubmit={handleAdd}>
        {['name', 'location', 'imageUrl', 'totalRooms', 'roomType', 'price'].map((f) => (
          <input
            key={f}
            className="admin-dashboard__input"
            placeholder={f}
            type={f === 'totalRooms' || f === 'price' ? 'number' : 'text'}
            value={newHotel[f]}
            onChange={(e) =>
              setNewHotel({
                ...newHotel,
                [f]: f === 'totalRooms' || f === 'price' ? +e.target.value : e.target.value
              })
            }
          />
        ))}
        <button type="submit" className="btn btn-submit">{editingHotel ? 'Update' : 'Submit'}</button>
        {editingHotel && (
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => {
              setEditingHotel(null);
              setNewHotel({ name: '', location: '', imageUrl: '', totalRooms: 0, roomType: '', price: 0 });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3 className="admin-dashboard__heading">Manage Hotels</h3>
      <div className="admin-dashboard__hotel-list">
        {hotels.map((h) => (
          <div key={h.id} className="admin-dashboard__hotel-item">
            <HotelCard hotel={h} isAdmin={true} onAction={handleEdit} />
            <button
              className="btn-delete"
              onClick={() => {
                if (window.confirm('Delete hotel?')) deleteHotel(h.id).then(fetchData);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <h3 className="admin-dashboard__heading">Booking Overview</h3>
      <div className="admin-dashboard__booking-list">
        {bookings.map((b) => (
          <div key={b.id} className="admin-dashboard__booking-card">
            <b>Booking ID:</b> {b.id}<br />
            {/* <b>User:</b> {b.user ? b.user.name : 'Unknown'}{' '} */}
           {/* <b>User:</b> {b.name || 'Unknown'}{' '} */}
        <b>User:</b> {b.name || 'Unknown'}{' '}
        {/* {b.name && (
          <button className="btn-details" onClick={() => setSelectedUser(b)}>Details</button>
        )}<br /> */}
        <br />

            <b>Hotel:</b> {b.hotelName}<br />
            <b>Room:</b> {b.roomType}, {b.status}<br />
            {b.status === 'PENDING' && (
              <>
                <button
                  className="btn-approve"
                  onClick={() => handleStatus(b.id, 'APPROVED')}
                >
                  Approve
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleStatus(b.id, 'REJECTED')}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))}
      </div>



      {selectedUser && (
        <div className="admin-dashboard__user-details">
          <h3>User Details</h3>
          <p><b>Name:</b> {selectedUser.name}</p>
          <p><b>Email:</b> {selectedUser.email}</p>
          <p><b>Phone:</b> {selectedUser.phone}</p>
          <p><b>Address:</b> {selectedUser.address}</p>
          <button className="btn-close" onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}
    </div>
  );
}




