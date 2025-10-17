import { useState } from 'react';
import { Header } from './components/layout';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Theme toggled:', !isDarkMode ? 'Dark' : 'Light');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    alert('Logout realizado!');
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Header */}
      <Header 
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className='container mx-auto px-4 py-8'>{/* Welcome Section */}</main>
    </div>
  );
}

export default App;
