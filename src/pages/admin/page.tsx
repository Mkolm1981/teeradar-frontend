import { useState, useEffect } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/AdminLayout';

const ADMIN_PASSWORD = 'TeeRadar2026!';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('teeradar_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('teeradar_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('teeradar_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) return <AdminLogin onLogin={handleLogin} />;
  return <AdminLayout onLogout={handleLogout} />;
}
