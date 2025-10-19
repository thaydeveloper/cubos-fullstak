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

export const MovieHero: React.FC<MovieHeroProps> = ({
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
    <div className='w-full max-w-[1342px] mx-auto px-4 lg:px-0 mb-8 pt-9'>
      {/* Container interno com imagem de fundo */}
      <div
        className='relative w-full rounded-lg overflow-hidden'
        style={{
          height: '697px',
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%), url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Container interno */}
        <div className='absolute inset-0 flex flex-col justify-center '>
          <div className='w-full max-w-[1268px] mx-auto'>
            {/* Título acima do cartaz */}
            <div className='mb-4 flex justify-between items-start '>
              <div>
                <h1 className='text-white font-montserrat font-semibold text-4xl mb-2'>{title}</h1>
                <p className='text-white/60 font-montserrat text-sm'>
                  Título original: {originalTitle}
                </p>
              </div>
              {/* Botões Editar e Deletar */}
              <div className='flex gap-2 pl-4'>
                <Button
                  onClick={onDelete}
                  className='font-montserrat font-semibold text-sm text-white'
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
                  className='font-montserrat font-semibold text-sm text-white'
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

            {/* Container com cartaz e conteúdo */}
            <div className='flex gap-8'>
              {/* Cartaz do filme */}
              <div className='flex-shrink-0'>
                <img
                  src={posterUrl}
                  alt={title}
                  className='w-[374px] h-[542px] object-cover rounded-lg shadow-2xl'
                />
              </div>

              {/* Conteúdo à direita */}
              <div className='flex-1 flex flex-col pt-6 sm:pt-9 lg:pt-0 xl:pt-6 2xl:pt-6 '>
                {/* Frase de efeito do filme */}
                {tagline && (
                  <p className='text-white/70 font-montserrat text-base italic mb-4'>{tagline}</p>
                )}

                {/* Sinopse e Estatísticas */}
                <div className='flex gap-6 pt-9'>
                  {/* Coluna da Esquerda - Sinopse e Gêneros */}
                  <div className='flex flex-col'>
                    {/* Container de Sinopse */}
                    <div
                      className='rounded-lg p-4'
                      style={{
                        width: '416px',
                        height: '300px',
                        backgroundColor: 'rgba(35, 34, 37, 0.6)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <h2 className='text-white font-montserrat font-semibold text-lg mb-3'>
                        SINOPSE
                      </h2>
                      <p className='text-white/80 font-montserrat text-sm leading-relaxed overflow-y-auto max-h-[240px]'>
                        {overview || 'Sinopse não disponível.'}
                      </p>
                    </div>

                    {/* Container de Gêneros - 16px abaixo da sinopse */}
                    <div
                      className='rounded p-4'
                      style={{
                        width: '325px',
                        backgroundColor: 'rgba(35, 34, 37, 0.6)',
                        backdropFilter: 'blur(4px)',
                        marginTop: '16px',
                        borderRadius: '4px',
                      }}
                    >
                      <h3 className='text-white font-montserrat font-semibold text-sm mb-2'>
                        Generos
                      </h3>
                      <div className='flex gap-2'>
                        {genres.map(genre => (
                          <div
                            key={genre.id}
                            className='rounded-sm px-2 py-2 font-montserrat text-sm text-white'
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
              {/* Container de Estatísticas */}
              <div className='flex flex-col gap-4'>
                {/* Estatísticas */}
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
        </div>
      </div>
    </div>
  );
};
