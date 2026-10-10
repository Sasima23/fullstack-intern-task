import { useEffect, useState } from 'react';
import api from '../api';
import TemplateCard from '../components/TemplateCard';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [tRes, fRes] = await Promise.all([
          api.get('/templates'),
          api.get('/favorites'),
        ]);
        setTemplates(tRes.data);
        setFavoriteIds(fRes.data.map((f) => f.id));
      } catch (err) {
        setError('Could not load templates');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      if (favoriteIds.includes(id)) {
        await api.delete(`/favorites/${id}`);
        setFavoriteIds(favoriteIds.filter((f) => f !== id));
      } else {
        await api.post(`/favorites/${id}`);
        setFavoriteIds([...favoriteIds, id]);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const categories = [...new Set(templates.map((t) => t.category))];

  const visible = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === '' || t.category === category)
  );

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Templates</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="text-gray-500">No templates found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              isFavorite={favoriteIds.includes(t.id)}
              onToggle={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}