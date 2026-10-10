import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import TemplateCard from '../components/TemplateCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/favorites');
        setFavorites(res.data);
      } catch (err) {
        setError('Could not load favorites');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      setFavorites(favorites.filter((f) => f.id !== id));
    } catch (err) {
      setError('Could not remove favorite');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      {favorites.length === 0 ? (
        <p className="text-gray-500">
          No favorites yet. <Link to="/templates" className="text-blue-600">Browse templates</Link>
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((t) => (
            <TemplateCard key={t.id} template={t} isFavorite={true} onToggle={removeFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}