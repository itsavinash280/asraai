import React from 'react';
import { Reveal } from './Reveal';

/**
 * Section furniture. Every section on the site opens the same way — a hairline
 * rule, a small tracked label, then display type — so the page reads as one
 * document rather than a stack of unrelated blocks.
 */

export const Eyebrow: React.FC<{
  children: React.ReactNode;
  className?: string;
  index?: string;
}> = ({ children, className = '', index }) => (
  <span
    className={`inline-flex items-baseline gap-3 text-eyebrow uppercase ${className}`}
  >
    {index && <span className="opacity-40 tabular-nums">{index}</span>}
    <span>{children}</span>
  </span>
);

export const SectionIntro: React.FC<{
  label: string;
  index?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Tone controls the hairline + label colour on dark vs light grounds. */
  tone?: 'dark' | 'light';
  align?: 'left' | 'between';
  className?: string;
  action?: React.ReactNode;
}> = ({
  label,
  index,
  title,
  lede,
  tone = 'light',
  align = 'left',
  className = '',
  action,
}) => {
  const rule = tone === 'dark' ? 'border-white/15' : 'border-ink-950/15';
  const muted = tone === 'dark' ? 'text-white/50' : 'text-ink-500';

  return (
    <div className={`border-t ${rule} pt-6 ${className}`}>
      <Reveal>
        <Eyebrow index={index} className={muted}>
          {label}
        </Eyebrow>
      </Reveal>

      <div
        className={
          align === 'between'
            ? 'mt-8 grid gap-8 lg:grid-cols-12 lg:items-end'
            : 'mt-8'
        }
      >
        <Reveal
          delay={80}
          className={align === 'between' ? 'lg:col-span-7' : 'max-w-[20ch]'}
        >
          <h2 className="text-display-3 font-semibold">{title}</h2>
        </Reveal>

        {lede && (
          <Reveal
            delay={160}
            className={
              align === 'between'
                ? 'lg:col-span-4 lg:col-start-9'
                : 'mt-6 max-w-measure-lg'
            }
          >
            <p className={`text-lede ${muted}`}>{lede}</p>
          </Reveal>
        )}

        {action && (
          <Reveal delay={220} className={align === 'between' ? 'lg:col-span-12' : ''}>
            {action}
          </Reveal>
        )}
      </div>
    </div>
  );
};

/** Consistent page gutters + max width for every editorial section. */
export const Container: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-editorial px-gutter ${className}`}>
    {children}
  </div>
);
