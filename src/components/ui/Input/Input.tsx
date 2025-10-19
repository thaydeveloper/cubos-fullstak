import React from 'react';
import { cn } from '../../../utils/cn';
import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, leftIcon, rightIcon, fullWidth = true, className, id, ...props },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className='text-xs font-medium text-[var(--color-mauve-dark-300)] block'
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className='relative'>
          {/* Left Icon */}
          {leftIcon && (
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mauve-dark-extra-3)]'>
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-3 py-2 text-sm',
              'bg-[var(--color-input-bg)]',
              'border rounded-[4px]',
              'text-[var(--color-input-text)]',
              'placeholder-[var(--color-mauve-dark-extra-3)]/60',
              'transition-all duration-200',
              'outline-none',
              'caret-[var(--color-input-border-focus)]',
              'focus:border-[var(--color-input-border-focus)]',
              hasError
                ? 'border-red-500 focus:border-red-500'
                : 'border-[var(--color-input-border)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
              style={{ color: 'var(--color-input-icon)' }}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <span className='text-xs text-red-400 mt-1'>{error}</span>}

        {/* Helper Text */}
        {helperText && !error && (
          <span className='text-xs text-[var(--color-mauve-dark-extra-3)]/60 mt-1'>
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
