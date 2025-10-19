import React from 'react';
import { MoviesContainer } from '../../containers';

export const Movies: React.FC = () => {
  return (
    <div className='w-full relative min-h-screen'>
      {/* Background com imagem */}
      <div
        className='fixed inset-0 bg-cover bg-bottom bg-no-repeat z-0'
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.6) 20%, #000000 100%), url('/src/assets/images/background-hero.png')`,
        }}
      />

      {/* Main Content */}
      <div className='relative z-10 flex flex-col min-h-screen'>
        <MoviesContainer />
      </div>
    </div>
  );
};
