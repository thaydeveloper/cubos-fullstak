import React from 'react';
import { cn } from '../../../utils/cn';
import type { MovieCardProps } from './MovieCard.types';

const PROGRESS_RADIUS = 28;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  poster,
  rating,
  isWatching = false,
  progress = 0,
  onClick,
}) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const dashOffset = PROGRESS_CIRCUMFERENCE * (1 - safeProgress / 100);

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-lg overflow-hidden cursor-pointer',
        'transition-transform duration-300 hover:scale-105',
        'group w-full h-full max-h-[330px]',
      )}
    >
      <div className='relative w-full h-full'>
        <img src={poster} alt={title} loading='lazy' className='w-full h-full object-cover' />

        {/* Overlay com gradiente e textos */}
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80' />
        <div className='absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 md:p-3 z-10 pointer-events-none'>
          <h3 className='text-white font-semibold text-xs sm:text-sm md:text-base leading-snug uppercase line-clamp-2 break-words mb-1 drop-shadow-lg'>
            {title}
          </h3>
          {rating && (
            <p className='text-white/80 text-[10px] sm:text-xs md:text-sm leading-snug truncate drop-shadow-md'>
              Ação, Aventura, Ficção Científica
            </p>
          )}
        </div>

        {/* Progress Ring (se estiver assistindo) */}
        {isWatching && safeProgress > 0 && (
          <div className='absolute top-2 left-2 sm:top-3 sm:left-3'>
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
