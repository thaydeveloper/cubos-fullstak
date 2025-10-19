import React from 'react';

interface MovieTrailerProps {
  videoKey: string;
}

export const MovieTrailer: React.FC<MovieTrailerProps> = ({ videoKey }) => {
  return (
    <div className='w-full max-w-[1302px] mx-auto px-4 lg:px-0'>
      <h2 className='text-white font-montserrat font-semibold text-2xl mb-4'>Trailer</h2>
      <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
        <iframe
          className='absolute inset-0 w-full h-full rounded-lg'
          src={`https://www.youtube.com/embed/${videoKey}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    </div>
  );
};
