import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/templates');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full border rounded px-3 py-2" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full border rounded px-3 py-2" />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        <p className="text-sm text-center">
          New user? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}