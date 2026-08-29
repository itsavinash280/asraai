import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../ui';

/**
 * Shared shell for every authentication screen.
 *
 * Two panes on desktop: a fixed editorial statement on the left, the working
 * form on the right. On mobile the statement collapses to a compact masthead
 * so the form is reachable without scrolling past a hero.
 */
export const AuthLayout: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, lede, children }) => (
  <div className="min-h-screen bg-ink-950 text-paper-50 lg:grid lg:grid-cols-12">
    {/* Editorial pane */}
    <aside className="grain relative hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-white/10 lg:p-gutter">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 top-1/3 h-[28rem] w-[28rem] rounded-full bg-agro-500/[0.07] blur-[120px]"
      />

      <Link
        to="/"
        className="relative font-display text-lg font-semibold tracking-tight text-white"
      >
        AsraVerse<span className="text-agro-400">.</span>
      </Link>

      <div className="relative">
        <Reveal>
          <p className="text-eyebrow uppercase text-white/40">{eyebrow}</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-8 font-display text-display-2 font-semibold">{title}</h1>
        </Reveal>
        {lede && (
          <Reveal delay={200}>
            <p className="mt-8 max-w-measure-lg text-lede text-white/50">{lede}</p>
          </Reveal>
        )}
      </div>

      <p className="relative text-eyebrow uppercase text-white/25">
        Free, permanently, for every Indian farmer
      </p>
    </aside>

    {/* Form pane */}
    <main className="flex flex-col justify-center px-gutter py-14 lg:col-span-7 lg:py-20">
      <div className="w-full max-w-lg lg:mx-auto">
        {/* Mobile masthead */}
        <div className="mb-12 lg:hidden">
          <Link to="/" className="font-display text-lg font-semibold text-white">
            AsraVerse<span className="text-agro-400">.</span>
          </Link>
          <h1 className="mt-8 font-display text-display-3 font-semibold">{title}</h1>
        </div>

        {children}
      </div>
    </main>
  </div>
);
