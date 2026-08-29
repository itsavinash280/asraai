import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Product-side design system.
 *
 * The dashboard shares the landing page's type scale and hairline language but
 * stays denser and calmer — no oversized display type, no reveal animation on
 * data. Panels are defined by a single hairline rather than shadows and
 * rounded cards, which is what keeps the app from reading as a template.
 */

/* ------------------------------------------------------------------ header */

export const PageHeader: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ eyebrow, title, lede, actions }) => (
  <header className="border-b border-ink-950/10 pb-10 dark:border-white/10">
    <p className="text-eyebrow uppercase text-ink-400">{eyebrow}</p>

    <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="font-display text-display-3 font-semibold text-ink-950 dark:text-white">
          {title}
        </h1>
        {lede && (
          <p className="mt-4 max-w-measure-lg text-ink-500 dark:text-ink-400">
            {lede}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </div>
  </header>
);

/* ------------------------------------------------------------------- panel */

export const Panel: React.FC<{
  title?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}> = ({ title, meta, action, className = '', children }) => (
  <section
    className={`border border-ink-950/10 bg-paper-50 p-6 dark:border-white/10 dark:bg-ink-900/50 ${className}`}
  >
    {(title || action) && (
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-ink-950/10 pb-4 dark:border-white/10">
        <div>
          {title && (
            <h2 className="font-display text-base font-semibold text-ink-950 dark:text-white">
              {title}
            </h2>
          )}
          {meta && <p className="mt-1 text-xs text-ink-400">{meta}</p>}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

/* -------------------------------------------------------------------- stat */

export const StatFigure: React.FC<{
  figure: React.ReactNode;
  label: string;
  delta?: string;
  tone?: 'default' | 'positive' | 'negative';
}> = ({ figure, label, delta, tone = 'default' }) => (
  <div className="border-t border-ink-950/15 pt-5 dark:border-white/15">
    <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-ink-950 lg:text-5xl dark:text-white">
      {figure}
    </p>
    <div className="mt-4 flex items-baseline justify-between gap-3">
      <p className="text-eyebrow uppercase text-ink-400">{label}</p>
      {delta && (
        <span
          className={`text-xs tabular-nums ${
            tone === 'positive'
              ? 'text-agro-600 dark:text-agro-400'
              : tone === 'negative'
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-ink-400'
          }`}
        >
          {delta}
        </span>
      )}
    </div>
  </div>
);

/* ------------------------------------------------------------- action tile */

export const ActionTile: React.FC<{
  index: string;
  title: string;
  body: string;
  to: string;
}> = ({ index, title, body, to }) => (
  <Link
    to={to}
    className="group relative flex flex-col justify-between border-b border-ink-950/10 py-7 dark:border-white/10"
  >
    <span
      aria-hidden="true"
      className="rule-grow absolute inset-x-0 bottom-0 h-px bg-agro-500"
    />
    <div className="flex items-baseline gap-4">
      <span className="text-eyebrow tabular-nums text-ink-300 transition-colors duration-500 group-hover:text-agro-600 dark:text-ink-600">
        {index}
      </span>
      <h3 className="font-display text-lg font-medium text-ink-950 transition-transform duration-500 ease-editorial group-hover:translate-x-1 dark:text-white">
        {title}
      </h3>
      <ArrowUpRight
        aria-hidden="true"
        className="ml-auto h-4 w-4 shrink-0 text-ink-300 transition-all duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-agro-600 dark:text-ink-600"
      />
    </div>
    <p className="mt-3 pl-9 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
      {body}
    </p>
  </Link>
);

/* ------------------------------------------------------------- empty state */

export const EmptyState: React.FC<{
  title: string;
  body: string;
  action?: React.ReactNode;
}> = ({ title, body, action }) => (
  <div className="border border-dashed border-ink-950/15 px-8 py-16 text-center dark:border-white/15">
    <h3 className="font-display text-xl font-medium text-ink-950 dark:text-white">
      {title}
    </h3>
    <p className="mx-auto mt-3 max-w-measure text-sm text-ink-500 dark:text-ink-400">
      {body}
    </p>
    {action && <div className="mt-8 flex justify-center">{action}</div>}
  </div>
);
