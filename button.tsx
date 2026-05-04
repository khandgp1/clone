import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-white border border-gold hover:bg-gold-dark hover:border-gold-dark active:scale-[0.98]',
  secondary:
    'bg-transparent text-white border border-white hover:bg-white hover:text-charcoal active:scale-[0.98]',
  ghost:
    'bg-transparent text-gold border-none hover:text-gold-light underline-offset-4 hover:underline active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-xs tracking-widest',
  lg: 'px-8 py-4 text-sm tracking-widest',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
