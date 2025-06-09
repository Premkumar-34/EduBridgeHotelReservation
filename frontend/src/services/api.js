import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080/api' });

API.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});


export const getProfile = () => API.get('/auth/profile');

export const register = (u) => API.post('/auth/register', u);
export const login = (u) => API.post('/auth/login', u);
export const getUserById = (id) => API.get(`/auth/user/${id}`);
export const getHotels = (filters) => API.get('/hotels/filter', { params: filters });
export const getAllHotels = () => API.get('/hotels/all');
export const addHotel = (h) => API.post('/hotels/add', h);
export const updateHotel = (id, h) => API.put(`/hotels/update/${id}`, h);
export const deleteHotel = (id) => API.delete(`/hotels/delete/${id}`);
export const bookHotel = (b) => API.post('/bookings/book', b);
export const getBookingsUser = (uid) => API.get(`/bookings/user/${uid}`);
export const getAllBookings = () => API.get('/bookings/all');
export const updateBooking = (id, status) => API.put(`/bookings/update/${id}`, null, { params: { status } });