import React from 'react';
import { cn } from '../../../utils/cn';
import type { ButtonProps } from './Button.types';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../../constants';

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
          BUTTON_VARIANTS[variant].base,
          variant === 'primary' && 'text-white',
          BUTTON_SIZES[size],
          fullWidth && 'w-full',
          className,
        )}
        style={{
          fontSize: '16px',
          lineHeight: '100%',
          letterSpacing: '0px',
          textAlign: 'center',
          ...(variant === 'secondary' && {
            color: BUTTON_VARIANTS.secondary.textColor,
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

ButtonComponent.displayName = 'Button';

export const Button = React.memo(ButtonComponent);
