import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * The single button in the design system. Everything else — CTAs, form
 * submits, nav actions — is a variant of this, so there is only ever one
 * hover, focus and disabled behaviour to maintain.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show a trailing arrow that steps right on hover. */
  arrow?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    to?: never;
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    to: string;
    href?: never;
  };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    to?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const base =
  'group/btn relative inline-flex items-center justify-center gap-2.5 font-medium ' +
  'transition-all duration-500 ease-editorial select-none rounded-full ' +
  'disabled:opacity-40 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink-950 text-paper-50 hover:bg-agro-600',
  inverse: 'bg-paper-50 text-ink-950 hover:bg-agro-500',
  /* Outlined on a light ground. */
  secondary:
    'bg-transparent border border-ink-950/20 text-ink-950 hover:border-ink-950/60 dark:border-white/25 dark:text-white dark:hover:border-white/60',
  /* Outlined on a dark ground. */
  outline: 'bg-transparent border border-white/25 text-white hover:border-white/70',
  ghost: 'text-current hover:opacity-60 px-0 rounded-none',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'text-[12px] tracking-wide px-5 py-2.5',
  md: 'text-[13px] tracking-wide px-7 py-3.5',
  lg: 'text-sm tracking-wide px-9 py-4',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  arrow = false,
  loading = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    base,
    variants[variant],
    variant === 'ghost' ? sizes[size].replace(/px-\d+(\.\d+)?/, '') : sizes[size],
    className,
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  const content = (
    <>
      {loading && (
        <span
          aria-hidden="true"
          className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"
        />
      )}
      <span>{children}</span>
      {arrow && !loading && (
        <ArrowRight
          aria-hidden="true"
          className="w-4 h-4 transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ButtonAsAnchor)}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button
      type={buttonRest.type ?? 'button'}
      className={classes}
      disabled={buttonRest.disabled || loading}
      {...buttonRest}
    >
      {content}
    </button>
  );
};
