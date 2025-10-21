import React, { useMemo } from 'react';
import { cn } from '../../../utils/cn';
import { PercentageCircle } from '../PercentageCircle';
import type { MovieCardProps } from './MovieCard.types';
import { GENRE_MAP } from '../../../constants';

export const MovieCard: React.FC<MovieCardProps> = React.memo(
  ({ title, poster, voteAverage = 0, rating, genreIds = [], genreText, onClick }) => {
    // Memoiza cálculo de porcentagem
    const percentage = useMemo(() => {
      const baseScore =
        typeof voteAverage === 'number' && voteAverage > 0 ? voteAverage : rating || 0;
      return Math.round(((baseScore as number) / 10) * 100);
    }, [voteAverage, rating]);

    // Memoiza processamento de gêneros
    const genres = useMemo(() => {
      if (genreText && genreText.trim()) {
        return genreText.trim();
      }
      return genreIds
        .slice(0, 3)
        .map(id => GENRE_MAP[id])
        .filter(Boolean)
        .join(', ');
    }, [genreText, genreIds]);

    return (
      <div
        onClick={onClick}
        className={cn(
          'relative rounded-lg overflow-hidden cursor-pointer',
          'group w-full h-full max-h-[330px]',
        )}
      >
        <div className='relative w-full h-full'>
          <img
            src={poster}
            alt={title}
            loading='lazy'
            className='w-full h-full object-cover'
            onError={e => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src.endsWith('background-hero.png')) return;
              target.src = '/src/assets/images/background-hero.png';
            }}
          />

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
            <div className='rounded-full p-2'>
              <PercentageCircle percentage={percentage} size='medium' />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MovieCard.displayName = 'MovieCard';
