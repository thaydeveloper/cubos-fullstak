import React from 'react';
import { PercentageCircle } from './ui/PercentageCircle';

interface MovieStatsProps {
  votes: number;
  percentage: number;
  releaseDate: string;
  runtime: number;
  budget: number;
  revenue: number;
  certification?: string;
  className?: string;
  mobileHeaderOnly?: boolean;
  mobileRestOnly?: boolean;
}

export const MovieStats: React.FC<MovieStatsProps> = props => {
  const {
    votes,
    percentage,
    releaseDate,
    runtime,
    budget,
    revenue,
    certification,
    className,
    mobileHeaderOnly,
    mobileRestOnly,
  } = props;
  const profit = revenue - budget;

  // Renderização condicional para mobile
  if (mobileHeaderOnly) {
    return (
      <div className={className ? className : ''} style={{ width: '100%' }}>
        <div className='flex gap-6 items-center justify-center'>
          {/* Classificação Indicativa */}
          <div
            className='rounded p-2'
            style={{
              minWidth: '90px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>
              CLASSIFICAÇÃO INDICATIVA
            </p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>
              {certification || 'Não informado'}
            </p>
          </div>
          {/* Votos */}
          <div
            className='rounded p-2'
            style={{
              minWidth: '60px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>VOTOS</p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>
              {votes.toLocaleString()}
            </p>
          </div>
          {/* Círculo de Porcentagem */}
          <div className='flex items-center h-[69px]'>
            <PercentageCircle percentage={percentage} size='mobile' />
          </div>
        </div>
      </div>
    );
  }

  if (mobileRestOnly) {
    return (
      <div className={className ? className : ''} style={{ width: '100%' }}>
        {/* Segunda linha: Lançamento + Duração */}
        <div className='flex gap-2 mb-2'>
          <div
            className='rounded p-2 flex-1'
            style={{
              backgroundColor: 'rgba(35,34,37,0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>
              LANÇAMENTO
            </p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>{releaseDate}</p>
          </div>
          <div
            className='rounded p-2 flex-1'
            style={{
              backgroundColor: 'rgba(35,34,37,0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>
              DURAÇÃO
            </p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>
              {Math.floor(runtime / 60)}h {runtime % 60}m
            </p>
          </div>
        </div>
        {/* Linha 3: Situação + Idioma */}
        <div className='flex gap-2 mb-2'>
          <div
            className='rounded p-2 flex-1'
            style={{
              backgroundColor: 'rgba(35,34,37,0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>
              SITUAÇÃO
            </p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>Lançado</p>
          </div>
          <div
            className='rounded p-2 flex-1'
            style={{
              backgroundColor: 'rgba(35,34,37,0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>IDIOMA</p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>Inglês</p>
          </div>
        </div>
        {/* Linha 4: Orçamento + Receita + Lucro */}
        <div className='flex gap-2'>
          <div
            className='rounded p-2 flex-1'
            style={{
              backgroundColor: 'rgba(35,34,37,0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>
              ORÇAMENTO
            </p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>
              ${(budget / 1000000).toFixed(0)}M
            </p>
          </div>
          <div
            className='rounded p-2 flex-1'
            style={{
              backgroundColor: 'rgba(35,34,37,0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>
              RECEITA
            </p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>
              ${(revenue / 1000000).toFixed(2)}M
            </p>
          </div>
          <div
            className='rounded p-2 flex-1'
            style={{
              backgroundColor: 'rgba(35,34,37,0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '10px',
            }}
          >
            <p className='font-montserrat font-bold uppercase text-[10px] text-[#B5B2BC]'>LUCRO</p>
            <p className='font-montserrat font-semibold text-[12px] text-white'>
              ${((revenue - budget) / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop padrão
  return (
    <div className={className ? className : ''} style={{ width: '416px' }}>
      <div>
        {/* Primeira linha: Classificação, Votos, Porcentagem */}
        <div className='flex gap-4 items-start mb-8'>
          {/* Classificação Indicativa */}
          <div
            className='rounded p-4 mb-'
            style={{
              width: '211px',
              height: '69px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              CLASSIFICAÇÃO INDICATIVA
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              {certification || 'Não informado'}
            </p>
          </div>

          {/* Votos */}
          <div
            className='rounded p-4'
            style={{
              width: '76px',
              height: '69px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              VOTOS
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              {votes.toLocaleString()}
            </p>
          </div>

          {/* Círculo de Porcentagem */}
          <div className='flex items-center h-[69px]'>
            <PercentageCircle percentage={percentage} size='small' />
          </div>
        </div>
      </div>

      <div className=''>
        {/* Segunda linha: Lançamento + Duração */}
        <div className='flex gap-4 mb-2'>
          <div
            className='rounded p-4'
            style={{
              width: '200px',
              height: '72px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              LANÇAMENTO
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              {releaseDate}
            </p>
          </div>

          <div
            className='rounded p-4'
            style={{
              width: '200px',
              height: '72px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              DURAÇÃO
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              {Math.floor(runtime / 60)}h {runtime % 60}m
            </p>
          </div>
        </div>

        {/* Linha 3: Situação + Idioma */}
        <div className='flex gap-4 mb-2'>
          <div
            className='rounded p-4'
            style={{
              width: '200px',
              height: '72px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              SITUAÇÃO
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              Lançado
            </p>
          </div>

          <div
            className='rounded p-4'
            style={{
              width: '200px',
              height: '72px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              IDIOMA
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              Inglês
            </p>
          </div>
        </div>

        {/* Linha 4: Orçamento + Receita + Lucro */}
        <div className='flex gap-4'>
          <div
            className='rounded p-4'
            style={{
              width: '128px',
              height: '72px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              ORÇAMENTO
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              ${(budget / 1000000).toFixed(0)}M
            </p>
          </div>

          <div
            className='rounded p-4'
            style={{
              width: '128px',
              height: '72px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              RECEITA
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              ${(revenue / 1000000).toFixed(2)}M
            </p>
          </div>

          <div
            className='rounded p-4'
            style={{
              width: '128px',
              height: '72px',
              backgroundColor: 'rgba(35, 34, 37, 0.75)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              className='font-montserrat font-bold uppercase'
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#B5B2BC',
              }}
            >
              LUCRO
            </p>
            <p
              className='font-montserrat font-semibold'
              style={{
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              ${(profit / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
