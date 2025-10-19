import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { SelectOption, SelectProps } from './Select.types';
import { cn } from '../../../utils/cn';

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  disabled = false,
  className,
  menuMaxHeight = 340,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const selected = useMemo<SelectOption | undefined>(
    () => options.find(o => o.value === (value ?? '')),
    [options, value],
  );

  useEffect(() => {
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
    };
  }, []);

  const handleSelect = (v: string) => {
    onChange(v);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const menuStyle: React.CSSProperties = {
    maxHeight: `${menuMaxHeight}px`,
    backgroundColor: '#232225',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    WebkitOverflowScrolling: 'touch',
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type='button'
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className={cn(
          'w-full px-4 py-3 rounded text-left font-montserrat text-sm text-white flex items-center justify-between transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-purple-500',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        )}
        style={{
          backgroundColor: '#232225',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        aria-haspopup='listbox'
        aria-expanded={open}
      >
        <span className={cn('truncate', !selected && 'text-white/60')}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={cn('ml-2 transition-transform', open && 'rotate-180')}
          aria-hidden
        >
          <path
            d='M7 10l5 5 5-5'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {open && (
        <div
          className='absolute left-0 right-0 mt-2 z-[60] rounded-md overflow-hidden shadow-lg'
          role='listbox'
          style={menuStyle}
        >
          {/* Option vazio para limpar */}
          <button
            type='button'
            onClick={() => handleSelect('')}
            className={cn(
              'w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none',
              value === '' ? 'bg-white/10' : undefined,
            )}
            role='option'
            aria-selected={value === ''}
          >
            Todos os gêneros
          </button>
          <div className='h-px bg-white/10' />
          {options.map(opt => (
            <button
              key={opt.value}
              type='button'
              onClick={() => handleSelect(opt.value)}
              className={cn(
                'w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none',
                value === opt.value ? 'bg-white/10' : undefined,
              )}
              role='option'
              aria-selected={value === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
