import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { useAuthStore } from '../../store';

export const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Theme toggled:', !isDarkMode ? 'Dark' : 'Light');
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Header - só mostra logout se não for página de login */}
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} onLogout={handleLogout} />

      {/* Main Content */}
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
};
