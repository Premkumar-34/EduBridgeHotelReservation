export default function HotelCard({ hotel, onAction, isAdmin = false }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      {hotel.imageUrl && (
        <img src={hotel.imageUrl} alt={hotel.name} width="200" onError={e => e.target.style.display = 'none'} />
      )}
      <br />
      <b>{hotel.name}</b><br />
      {hotel.location}<br />
      {hotel.roomType} - ₹{hotel.price}<br />
      <button onClick={() => onAction(hotel)}>{isAdmin ? 'Edit' : 'Book'}</button>
    </div>
  );
}
