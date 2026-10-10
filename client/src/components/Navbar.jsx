import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-bold text-blue-600">Template Store</span>
        <Link to="/templates" className="text-gray-700 hover:text-blue-600">Templates</Link>
        <Link to="/favorites" className="text-gray-700 hover:text-blue-600">My Favorites</Link>
      </div>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm text-gray-600">Hi, {user.name}</span>}
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}