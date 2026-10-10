import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Templates from './pages/Templates';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/templates" element={<Templates />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}