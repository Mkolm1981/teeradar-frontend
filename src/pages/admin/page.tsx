// src/pages/admin/page.tsx
import { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/AdminLayout';

const ADMIN_KEY = 'tr_admin_auth';
const ADMIN_PASSWORD = 'TeeRadar2026!';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem(ADMIN_KEY) === 'true');
  }, []);

  const handleLogin = (pw: string) => {
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_KEY, 'true');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_KEY);
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={handleLogin} />;
  return <AdminLayout onLogout={handleLogout} />;
}
