import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      window.alert("Registration successful! Please log in.");
      navigate('/login');
    } catch (err) {
      window.alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
  <form className="register-form" onSubmit={handle}>
    <h2 className="register-title">Register</h2>
    {['name', 'email', 'phone', 'address', 'password'].map(field => (
      <input
        key={field}
        className="register-input"
        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
        type={field === 'password' ? 'password' : 'text'}
        value={form[field]}
        onChange={e => setForm({ ...form, [field]: e.target.value })}
        required
      />
    ))}
    <button className="register-button" type="submit">Sign Up</button>
  </form>
</div>

  );
}
