import React from 'react';
import { useThemeStore } from '../../store';

export const Footer: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <footer
      className='fixed bottom-0 left-0 w-full border-t-[1px] z-50 transition-colors duration-300'
      style={{
        backgroundColor: isDarkMode ? 'rgba(18, 17, 19, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: isDarkMode ? 'var(--color-mauve-alpha-16)' : 'var(--color-mauve-alpha-12)',
      }}
    >
      <div className='w-full px-4 md:px-6 lg:px-8'>
        <div className='flex items-center justify-center h-14 md:h-16'>
          <p
            className='text-sm md:text-base text-center transition-colors duration-300'
            style={{
              color: isDarkMode ? 'var(--color-mauve-alpha-16)' : 'var(--color-mauve-alpha-6)',
            }}
          >
            2025 © Todos os direitos reservados a{' '}
            <span className='font-semibold'>Cubos Movies</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
