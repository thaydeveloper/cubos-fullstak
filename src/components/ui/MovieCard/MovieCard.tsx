import React from 'react';
import { cn } from '../../../utils/cn';
import { PercentageCircle } from '../PercentageCircle';
import type { MovieCardProps } from './MovieCard.types';

// Mapa de gêneros do TMDB
const GENRE_MAP: Record<number, string> = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção Científica',
  10770: 'Cinema TV',
  53: 'Thriller',
  10752: 'Guerra',
  37: 'Faroeste',
};

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  poster,
  voteAverage = 0,
  genreIds = [],
  onClick,
}) => {
  // Converte vote_average (0-10) para porcentagem
  const percentage = Math.round((voteAverage / 10) * 100);

  // Pega os nomes dos gêneros
  const genres = genreIds
    .slice(0, 3)
    .map(id => GENRE_MAP[id])
    .filter(Boolean)
    .join(', ');

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-lg overflow-hidden cursor-pointer',
        'group w-full h-full max-h-[330px]',
      )}
    >
      <div className='relative w-full h-full'>
        <img src={poster} alt={title} loading='lazy' className='w-full h-full object-cover' />

        {/* Overlay padrão (sempre visível) */}
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80' />

        {/* Conteúdo padrão - sempre visível */}
        <div className='absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 md:p-3 z-10 pointer-events-none transition-all duration-300 group-hover:bottom-2'>
          <h3
            className='font-montserrat font-semibold uppercase line-clamp-2 break-words mb-0 group-hover:mb-1 drop-shadow-lg transition-all duration-300'
            style={{
              fontSize: '16px',
              lineHeight: '100%',
              letterSpacing: '0px',
              color: '#EEEEEE',
            }}
          >
            {title}
          </h3>
          {/* Categorias só aparecem no hover */}
          {genres && (
            <p
              className='font-montserrat font-normal truncate drop-shadow-md max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden'
              style={{
                fontSize: '12.8px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B4B4B4',
              }}
            >
              {genres}
            </p>
          )}
        </div>

        {/* Círculo de porcentagem - só aparece no hover */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-20'>
          <div
            className='rounded-full p-2'
            /*  */
          >
            <PercentageCircle percentage={percentage} size='medium' />
          </div>
        </div>
      </div>
    </div>
  );
};
