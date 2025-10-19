import React from 'react';
import { cn } from '../../../utils/cn';
import type { ButtonProps } from './Button.types';

const buttonVariants = {
  primary: {
    base: 'bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-hover)] hover:border-[var(--color-button-primary-hover-border)] hover:backdrop-blur-sm active:bg-[var(--color-purple-900)] disabled:bg-[var(--color-mauve-dark-extra-3)] text-white border border-transparent',
  },
  secondary: {
    base: 'bg-[var(--color-button-secondary-bg)] backdrop-blur-sm border-[var(--color-button-secondary-bg)] hover:bg-[var(--color-button-secondary-hover)] hover:border-[var(--color-button-secondary-hover-border)] hover:backdrop-blur active:bg-[var(--color-button-secondary-active)] active:border-[var(--color-button-secondary-active-border)] active:backdrop-blur-sm disabled:bg-[var(--color-button-secondary-disabled)] disabled:border-[var(--color-button-secondary-disabled-border)] border',
    textColor: 'rgba(241, 221, 255, 0.98)',
  },
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs h-9',
  md: 'px-5 py-3 text-sm min-h-[44px]',
  lg: 'px-8 py-3 text-base h-12',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-[12px]',
          'font-roboto font-normal rounded-[2px]',
          'transition-all duration-200',
          'outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400',
          'disabled:cursor-not-allowed disabled:opacity-50',
          buttonVariants[variant].base,
          variant === 'primary' && 'text-white',
          buttonSizes[size],
          fullWidth && 'w-full',
          className,
        )}
        style={{
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0px',
          textAlign: 'center',
          ...(variant === 'secondary' && {
            color: buttonVariants.secondary.textColor,
          }),
        }}
        {...props}
      >
        {isLoading ? (
          <>
            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
