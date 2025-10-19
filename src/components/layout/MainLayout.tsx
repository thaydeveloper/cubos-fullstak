import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuthStore, useThemeStore } from '../../store';

export const MainLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Aplica o tema ao montar o componente
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className='min-h-screen text-foreground transition-colors duration-300'>
      {/* Header */}
      <Header isDarkMode={isDarkMode} onThemeToggle={toggleTheme} onLogout={handleLogout} />

      {/* Main Content */}
      <main className='flex-1 pt-14 md:pt-16 pb-14 md:pb-16'>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
