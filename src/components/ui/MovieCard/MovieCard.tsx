import React from 'react';
import { cn } from '../../../utils/cn';
import type { MovieCardProps } from './MovieCard.types';

const PROGRESS_RADIUS = 28;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

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
  isWatching = false,
  progress = 0,
  onClick,
}) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const dashOffset = PROGRESS_CIRCUMFERENCE * (1 - safeProgress / 100);

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
          <h3 className='text-white font-semibold text-xs sm:text-sm md:text-base leading-snug uppercase line-clamp-2 break-words mb-0 group-hover:mb-1 drop-shadow-lg transition-all duration-300'>
            {title}
          </h3>
          {/* Categorias só aparecem no hover */}
          {genres && (
            <p className='text-white/80 text-[10px] sm:text-xs md:text-sm leading-snug truncate drop-shadow-md max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden'>
              {genres}
            </p>
          )}
        </div>

        {/* Círculo de porcentagem - só aparece no hover */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-20'>
          <div className='relative w-24 h-24 sm:w-28 sm:h-28'>
            {/* Fundo com blur apenas no círculo */}
            <div
              className='absolute inset-0 rounded-full'
              style={{
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            />

            {/* SVG do círculo */}
            <svg className='w-full h-full transform -rotate-90 relative z-10' viewBox='0 0 100 100'>
              <circle
                cx='50'
                cy='50'
                r='45'
                stroke='rgba(255, 255, 255, 0.2)'
                strokeWidth='6'
                fill='none'
              />
              <circle
                cx='50'
                cy='50'
                r='45'
                stroke='#FFE000'
                strokeWidth='6'
                fill='none'
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
                strokeLinecap='round'
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center z-10'>
              <span className='text-[#FFE000] text-2xl sm:text-3xl font-bold drop-shadow-lg'>
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Progress Ring (se estiver assistindo) - apenas fora do hover */}
        {isWatching && safeProgress > 0 && (
          <div className='absolute top-2 left-2 sm:top-3 sm:left-3 group-hover:opacity-0 transition-opacity duration-300'>
            <div className='relative w-10 h-10 sm:w-12 sm:h-12 lg:w-11 lg:h-11'>
              <svg className='w-full h-full transform -rotate-90' viewBox='0 0 64 64'>
                <circle
                  cx='32'
                  cy='32'
                  r={PROGRESS_RADIUS}
                  stroke='rgba(255, 255, 255, 0.2)'
                  strokeWidth='4'
                  fill='none'
                />
                <circle
                  cx='32'
                  cy='32'
                  r={PROGRESS_RADIUS}
                  stroke='#FFE000'
                  strokeWidth='4'
                  fill='none'
                  strokeDasharray={PROGRESS_CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  strokeLinecap='round'
                />
              </svg>
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='text-white text-[10px] sm:text-xs lg:text-[11px] font-bold'>
                  {Math.round(safeProgress)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
