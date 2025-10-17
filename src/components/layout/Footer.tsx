import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className='fixed bottom-0 left-0 w-full border-t-[1px] border-[var(--color-mauve-alpha-16)] z-50'
      style={{ backgroundColor: 'rgba(18, 17, 19, 0.9)' }}
    >
      <div className='w-full px-4 md:px-6 lg:px-8'>
        <div className='flex items-center justify-center h-14 md:h-16'>
          <p className='text-[var(--color-mauve-alpha-16)] text-sm md:text-base text-center'>
            2025 © Todos os direitos reservados a{' '}
            <span className='font-semibold'>Cubos Movies</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
