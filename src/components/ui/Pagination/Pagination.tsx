import React from 'react';
import { cn } from '../../../utils/cn';
import type { PaginationProps } from './Pagination.types';
import ChevronLeftIcon from '../../../assets/icons/ChevronLeft.svg';
import ChevronRightIcon from '../../../assets/icons/ChevronRight.svg';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Se tem 5 ou menos páginas, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calcula o início e fim do range de páginas visíveis
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisible - 1);

      // Ajusta o início se estivermos próximos do fim
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      // Adiciona as páginas ao array
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className='flex items-center justify-center w-full gap-2 sm:gap-3 px-2 sm:px-4 py-3'>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex items-center justify-center flex-shrink-0',
          'transition-all duration-200',
          'rounded-[2px]',
          'w-[40px] h-[40px] sm:w-[64px] sm:h-[44px]',
        )}
        style={{
          backgroundColor: currentPage === 1 ? 'rgba(235, 234, 248, 0.08)' : '#8E4EC6',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
        aria-label='Página anterior'
      >
        <img
          src={ChevronLeftIcon}
          alt=''
          className='w-5 h-5'
          style={{
            filter: 'brightness(0) invert(1)',
          }}
        />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'flex items-center justify-center flex-shrink-0',
            'font-medium text-sm transition-all duration-200',
            'font-roboto rounded-[2px]',
            'w-[40px] h-[40px] sm:w-[49px] sm:h-[44px]',
          )}
          style={{
            backgroundColor: page === currentPage ? 'rgba(235, 234, 248, 0.08)' : '#8E4EC6',
            color: '#FFFFFF',
          }}
          aria-label={`Página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex items-center justify-center flex-shrink-0',
          'transition-all duration-200',
          'rounded-[2px]',
          'w-[40px] h-[40px] sm:w-[64px] sm:h-[44px]',
        )}
        style={{
          backgroundColor: currentPage === totalPages ? 'rgba(235, 234, 248, 0.08)' : '#8E4EC6',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
        aria-label='Próxima página'
      >
        <img
          src={ChevronRightIcon}
          alt=''
          className='w-5 h-5'
          style={{
            filter: 'brightness(0) invert(1)',
          }}
        />
      </button>
    </div>
  );
};
