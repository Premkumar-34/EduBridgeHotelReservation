import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> {/* 🔥 Fixed this */}
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/user"
        element={user?.role === 'USER' ? <UserDashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
