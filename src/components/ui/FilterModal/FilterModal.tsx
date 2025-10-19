import React, { useState } from 'react';
import type { FilterModalProps, MovieFilters } from './FilterModal.types';
import { Button } from '../Button';
import { Select } from '../Select';
import { GENRES, SORT_OPTIONS, DEFAULT_FILTERS } from '../../../constants';

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState<MovieFilters>(DEFAULT_FILTERS);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <>
      {/* Backdrop com blur */}
      <div
        className='fixed inset-0 z-40'
        style={{
          backgroundColor: 'rgba(181, 178, 188, 0.25)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div
          className='relative w-full max-w-[520px] rounded-lg'
          style={{
            backgroundColor: '#232225',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between p-6 pb-4 border-b border-white/10'>
            <h2
              className='text-white text-start flex-1 text-2xl font-normal leading-none tracking-normal'
              style={{
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Filtros
            </h2>
            <button
              onClick={onClose}
              className='text-white/60 hover:text-white transition-colors text-2xl leading-none'
              aria-label='Fechar'
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className='p-6 space-y-4'>
            {/* Gênero */}
            <div>
              <label className='block text-white font-montserrat text-sm font-semibold mb-2'>
                Gênero
              </label>
              <Select
                value={filters.genre?.toString() || ''}
                onChange={val => setFilters({ ...filters, genre: val ? Number(val) : '' })}
                options={GENRES.map(g => ({ label: g.name, value: g.id.toString() }))}
                placeholder='Todos os gêneros'
                menuMaxHeight={330}
              />
            </div>

            {/* Ano de Lançamento */}
            <div>
              <label className='block text-white font-montserrat text-sm font-semibold mb-2'>
                Ano de Lançamento
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <input
                    type='number'
                    placeholder='De'
                    value={filters.yearFrom}
                    onChange={e => setFilters({ ...filters, yearFrom: e.target.value })}
                    min='1900'
                    max='2100'
                    className='w-full px-4 py-3 rounded font-montserrat text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500'
                    style={{
                      backgroundColor: '#232225',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder='Até'
                    value={filters.yearTo}
                    onChange={e => setFilters({ ...filters, yearTo: e.target.value })}
                    min='1900'
                    max='2100'
                    className='w-full px-4 py-3 rounded font-montserrat text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500'
                    style={{
                      backgroundColor: '#232225',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Avaliação Mínima */}
            <div>
              <label className='block text-white font-montserrat text-sm font-semibold mb-2'>
                Avaliação Mínima
              </label>
              <div className='flex items-center gap-3'>
                <input
                  type='range'
                  min='0'
                  max='10'
                  step='0.5'
                  value={filters.ratingMin || '0'}
                  onChange={e => setFilters({ ...filters, ratingMin: e.target.value })}
                  className='flex-1'
                  style={{
                    accentColor: '#8E4EC6',
                  }}
                />
                <span className='text-white font-montserrat text-sm font-semibold min-w-[40px] text-right'>
                  {filters.ratingMin || '0'} ⭐
                </span>
              </div>
            </div>

            {/* Ordenar por */}
            <div>
              <label className='block text-white font-montserrat text-sm font-semibold mb-2'>
                Ordenar por
              </label>
              <Select
                value={filters.sortBy}
                onChange={val => setFilters({ ...filters, sortBy: val })}
                options={SORT_OPTIONS.map(o => ({ label: o.label, value: o.value }))}
                placeholder='Ordenar por'
                menuMaxHeight={220}
              />
            </div>
          </div>

          {/* Footer */}
          <div className='flex justify-end gap-3 p-6 pt-0'>
            <Button
              variant='secondary'
              onClick={handleReset}
              style={{
                width: '98px',
                minWidth: '98px',
                height: '44px',
                minHeight: '44px',
                borderRadius: '2px',
                paddingTop: '12px',
                paddingRight: '20px',
                paddingBottom: '12px',
                paddingLeft: '20px',
                opacity: 1,
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApply}
              className='w-[149px] min-w-[98px] h-11 rounded-[2px] px-5 py-3 text-center font-normal text-base leading-none tracking-normal'
              style={{
                background: '#8E4EC6',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
