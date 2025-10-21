import React from 'react';
import { Button } from './ui/Button';
import { MovieStats } from './MovieStats';

interface MovieHeroProps {
  title: string;
  originalTitle: string;
  tagline?: string;
  posterUrl: string;
  backdropUrl: string;
  overview: string;
  genres: Array<{ id: number; name: string }>;
  votes: number;
  percentage: number;
  releaseDate: string;
  runtime: number;
  budget: number;
  revenue: number;
  certification?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const MovieHero: React.FC<MovieHeroProps> = React.memo(
  ({
    title,
    originalTitle,
    tagline,
    posterUrl,
    backdropUrl,
    overview,
    genres,
    votes,
    percentage,
    releaseDate,
    runtime,
    budget,
    revenue,
    certification,
    onEdit,
    onDelete,
  }) => {
    return (
      <div className='w-full max-w-[1342px] mx-auto px-2 sm:px-4 lg:px-0 mb-8 pt-4 sm:pt-6 lg:pt-9'>
        {/* Container interno com imagem de fundo */}
        <div
          className={
            'relative w-full rounded-lg overflow-visible md:overflow-hidden md:min-h-[697px]'
          }
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%), url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Container interno */}
          <div className='relative md:absolute md:inset-0 flex flex-col md:justify-center'>
            <div className='w-full max-w-[1268px] mx-auto px-2 sm:px-4 lg:px-6'>
              {/* Desktop: Título, botões, cartaz, conteúdo, stats */}
              <div className='hidden md:block'>
                <div className='mb-4 flex flex-col lg:flex-row justify-between items-start gap-4'>
                  <div className='flex-1'>
                    <h1 className='text-white font-montserrat font-semibold text-2xl lg:text-3xl xl:text-4xl mb-2'>
                      {title}
                    </h1>
                    <p className='text-white/60 font-montserrat text-xs sm:text-sm'>
                      Título original: {originalTitle}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      onClick={onDelete}
                      className='font-montserrat font-semibold text-sm text-white whitespace-nowrap'
                      style={{
                        width: '91px',
                        height: '44px',
                        minHeight: '44px',
                        borderRadius: '2px',
                        paddingTop: '12px',
                        paddingRight: '20px',
                        paddingBottom: '12px',
                        paddingLeft: '20px',
                        background: 'rgba(183, 68, 247, 0.08)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      Deletar
                    </Button>
                    <button
                      onClick={onEdit}
                      className='font-montserrat font-semibold text-sm text-white whitespace-nowrap'
                      style={{
                        width: '82px',
                        height: '44px',
                        minHeight: '44px',
                        borderRadius: '2px',
                        paddingTop: '12px',
                        paddingRight: '20px',
                        paddingBottom: '12px',
                        paddingLeft: '20px',
                        background: '#8E4EC6',
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8'>
                  <div className='flex-shrink-0 mx-auto lg:mx-0'>
                    <img
                      src={posterUrl}
                      alt={title}
                      className='w-[280px] md:w-[320px] lg:w-[374px] h-auto lg:h-[542px] object-cover rounded-lg shadow-2xl'
                    />
                  </div>
                  <div className='flex-1 flex flex-col pt-2 md:pt-4 lg:pt-6 xl:pt-6'>
                    {tagline ? (
                      <p className='text-white/70 font-montserrat text-sm md:text-base italic mb-3 md:mb-4 px-2 md:px-0'>
                        {tagline}
                      </p>
                    ) : (
                      <p className='text-white/70 font-montserrat text-sm md:text-base italic mb-3 md:mb-4 px-2 md:px-0'>
                        tudo termina quando acaba
                      </p>
                    )}
                    <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 pt-2 md:pt-4 lg:pt-9'>
                      <div className='flex flex-col gap-4 w-full'>
                        <div
                          className='rounded-lg p-3 md:p-4 w-full flex-1'
                          style={{
                            minHeight: '250px',
                            backgroundColor: 'rgba(35, 34, 37, 0.6)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          <h2 className='text-white font-montserrat font-semibold text-base md:text-lg mb-2 md:mb-3'>
                            SINOPSE
                          </h2>
                          <p className='text-white/80 font-montserrat text-xs md:text-sm leading-relaxed overflow-y-auto max-h-[200px] md:max-h-[240px]'>
                            {overview || 'Sinopse não disponível.'}
                          </p>
                        </div>
                        <div
                          className='rounded p-3 md:p-4 w-full'
                          style={{
                            backgroundColor: 'rgba(35, 34, 37, 0.6)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '4px',
                          }}
                        >
                          <h3 className='text-white font-montserrat font-semibold text-xs md:text-sm mb-2'>
                            Generos
                          </h3>
                          <div className='flex flex-wrap gap-2'>
                            {genres.map(genre => (
                              <div
                                key={genre.id}
                                className='rounded-sm px-2 py-1.5 md:py-2 font-montserrat text-xs md:text-sm text-white'
                                style={{
                                  backgroundColor: 'rgba(197, 80, 255, 0.18)',
                                  backdropFilter: 'blur(4px)',
                                }}
                              >
                                {genre.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='hidden lg:flex flex-col gap-4'>
                    <MovieStats
                      votes={votes}
                      percentage={percentage}
                      releaseDate={releaseDate}
                      runtime={runtime}
                      budget={budget}
                      revenue={revenue}
                      certification={certification}
                    />
                  </div>
                </div>
              </div>
              {/* Mobile: layout vertical, ordem conforme Figma */}
              <div className='md:hidden flex flex-col items-center w-full pt-2 pb-8 sm:pb-12 lg:pb-16 px-2 sm:px-4'>
                {/* Cartaz */}
                <img
                  src={posterUrl}
                  alt={title}
                  className='mb-4 shadow-2xl w-full max-w-[340px] sm:max-w-[382px] h-auto'
                  style={{
                    borderRadius: '4px',
                    objectFit: 'cover',
                    opacity: 1,
                    transform: 'rotate(0deg)',
                  }}
                />
                {/* Botões */}
                <div className='flex flex-row gap-2 mb-4 w-full max-w-[382px] justify-center items-center px-2'>
                  <Button
                    onClick={onDelete}
                    className='font-montserrat font-semibold text-xs sm:text-sm text-white'
                    style={{
                      width: '91px',
                      height: '44px',
                      minHeight: '44px',
                      borderRadius: '2px',
                      paddingTop: '12px',
                      paddingRight: '20px',
                      paddingBottom: '12px',
                      paddingLeft: '20px',
                      background: 'rgba(183, 68, 247, 0.08)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    Deletar
                  </Button>
                  <Button
                    onClick={onEdit}
                    className='font-montserrat font-semibold text-xs sm:text-sm text-white flex-1'
                    style={{
                      maxWidth: '270px',
                      height: '44px',
                      minHeight: '44px',
                      borderRadius: '2px',
                      paddingTop: '12px',
                      paddingRight: '20px',
                      paddingBottom: '12px',
                      paddingLeft: '20px',
                      background: '#8E4EC6',
                      opacity: 1,
                      transform: 'rotate(0deg)',
                    }}
                  >
                    Editar
                  </Button>
                </div>
                {/* Título e título original */}
                <div className='w-full text-center mb-4 px-2'>
                  <h1 className='text-white font-montserrat font-semibold text-xl sm:text-2xl mb-1'>
                    {title}
                  </h1>
                  <p className='text-white/60 font-montserrat text-xs'>
                    Título original: {originalTitle}
                  </p>
                </div>
                {/* Classificação, votos, percentual */}
                <div className='flex justify-center items-center gap-2 sm:gap-4 mb-4 w-full px-2'>
                  <MovieStats
                    votes={votes}
                    percentage={percentage}
                    releaseDate={releaseDate}
                    runtime={runtime}
                    budget={budget}
                    revenue={revenue}
                    certification={certification}
                    mobileHeaderOnly
                  />
                </div>
                {/* Sinopse */}
                {tagline && (
                  <p className='text-white/70 font-montserrat text-base italic mb-2 text-center mb-4 px-2'>
                    {tagline}
                  </p>
                )}
                <div
                  className='rounded-lg p-4 w-full mb-4 px-2'
                  style={{ backgroundColor: 'rgba(35,34,37,0.6)', backdropFilter: 'blur(4px)' }}
                >
                  <h2 className='text-white font-montserrat font-semibold text-lg mb-2'>SINOPSE</h2>
                  <p className='text-white/80 font-montserrat text-sm leading-relaxed'>
                    {overview || 'Sinopse não disponível.'}
                  </p>
                </div>
                {/* Gêneros */}
                <div
                  className='rounded p-4 w-full mb-4 px-2'
                  style={{
                    backgroundColor: 'rgba(35,34,37,0.6)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '4px',
                  }}
                >
                  <h3 className='text-white font-montserrat font-semibold text-sm mb-2'>Gêneros</h3>
                  <div className='flex flex-wrap gap-2'>
                    {genres.map(genre => (
                      <div
                        key={genre.id}
                        className='rounded-sm px-2 py-2 font-montserrat text-sm text-white'
                        style={{
                          backgroundColor: 'rgba(197,80,255,0.18)',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {genre.name}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Estatísticas restantes */}
                <div className='w-full mb-4 px-2'>
                  <MovieStats
                    votes={votes}
                    percentage={percentage}
                    releaseDate={releaseDate}
                    runtime={runtime}
                    budget={budget}
                    revenue={revenue}
                    certification={certification}
                    mobileRestOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MovieHero.displayName = 'MovieHero';
