/**
 * Variantes de estilo para botões
 */
export const BUTTON_VARIANTS = {
  primary: {
    base: 'bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-hover)] hover:border-[var(--color-button-primary-hover-border)] hover:backdrop-blur-sm active:bg-[var(--color-purple-900)] disabled:bg-[var(--color-mauve-dark-extra-3)] text-white border border-transparent',
  },
  secondary: {
    base: 'bg-[var(--color-button-secondary-bg)] backdrop-blur-sm border-[var(--color-button-secondary-bg)] hover:bg-[var(--color-button-secondary-hover)] hover:border-[var(--color-button-secondary-hover-border)] hover:backdrop-blur active:bg-[var(--color-button-secondary-active)] active:border-[var(--color-button-secondary-active-border)] active:backdrop-blur-sm disabled:bg-[var(--color-button-secondary-disabled)] disabled:border-[var(--color-button-secondary-disabled-border)] border',
    textColor: 'rgba(241, 221, 255, 0.98)',
  },
} as const;

/**
 * Tamanhos disponíveis para botões
 */
export const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-xs h-9',
  md: 'px-5 py-3 text-sm min-h-[44px]',
  lg: 'px-8 py-3 text-base h-12',
} as const;

/**
 * Configurações de tamanho para o componente PercentageCircle
 */
export const PERCENTAGE_CIRCLE_SIZES = {
  mobile: {
    width: 69,
    height: 69,
    strokeWidth: 4,
    fontSize: '16px',
    radius: 30,
  },
  small: {
    width: 98,
    height: 98,
    strokeWidth: 5,
    fontSize: '24px',
    radius: 42,
  },
  medium: {
    width: 98,
    height: 98,
    strokeWidth: 5,
    fontSize: '24px',
    radius: 42,
  },
  large: {
    width: 98,
    height: 98,
    strokeWidth: 5,
    fontSize: '24px',
    radius: 42,
  },
} as const;
