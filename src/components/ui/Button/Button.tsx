import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';
import { Icon } from '../Icon';

/**
 * Maps Button props to daisyUI + Lahzo theme classes. Variants come straight
 * from the theme — no raw colors, no off-scale sizing.
 */
export const buttonVariants = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      success: 'btn-success',
      error: 'btn-error',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    square: { true: 'btn-square', false: '' },
    block: { true: 'btn-block', false: '' },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
    square: false,
    block: false,
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Optional leading Phosphor icon. */
  leftIcon?: PhosphorIcon;
  /** Optional trailing Phosphor icon. */
  rightIcon?: PhosphorIcon;
  /** Show a spinner and disable the button. */
  loading?: boolean;
  children?: ReactNode;
}

/**
 * The Lahzo button. Default is `secondary` / `md`. Use exactly one `primary`
 * button per surface; `ghost` is for icon-only utilities; `link` for inline CTAs.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    square,
    block,
    leftIcon,
    rightIcon,
    loading = false,
    disabled,
    type = 'button',
    className,
    children,
    ...props
  },
  ref,
) {
  const iconSize = size === 'xs' || size === 'sm' ? 16 : 20;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, square, block }), className)}
      {...props}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" aria-hidden="true" />
      ) : (
        leftIcon && <Icon icon={leftIcon} size={iconSize} />
      )}
      {children}
      {!loading && rightIcon && <Icon icon={rightIcon} size={iconSize} />}
    </button>
  );
});
