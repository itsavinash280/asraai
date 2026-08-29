import React from 'react';
import { Link } from 'react-router-dom';

const CAPABILITIES = [
  { label: 'Crop recommendation', to: '/crop-recommendation' },
  { label: 'Leaf disease diagnosis', to: '/disease-detection' },
  { label: 'Mandi price forecast', to: '/price-prediction' },
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Weather advisory', to: '/weather' },
];

const PORTALS = [
  { label: 'Administration', to: '/admin/login' },
  { label: 'KVK agri expert', to: '/expert/login' },
  { label: 'Logistics partner', to: '/transport/login' },
  { label: 'Government schemes', to: '/schemes' },
];

export const Footer: React.FC = () => (
  <footer className="mt-auto border-t border-ink-950/10 bg-paper-100 dark:border-white/10 dark:bg-ink-950">
    <div className="px-gutter py-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-lg font-semibold text-ink-950 dark:text-white">
            AsraVerse<span className="text-agro-600 dark:text-agro-400">.</span>
          </p>
          <p className="mt-4 max-w-measure text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            Agricultural intelligence for Indian smallholders — crop planning,
            disease diagnosis, price forecasting and direct trade.
          </p>
        </div>

        <nav aria-label="Capabilities" className="lg:col-span-3 lg:col-start-7">
          <p className="text-eyebrow uppercase text-ink-400">Capabilities</p>
          <ul className="mt-5 space-y-2.5">
            {CAPABILITIES.map((c) => (
              <li key={c.to}>
                <Link
                  to={c.to}
                  className="link-underline text-[13px] text-ink-600 hover:text-ink-950 dark:text-ink-400 dark:hover:text-white"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Portals" className="lg:col-span-3">
          <p className="text-eyebrow uppercase text-ink-400">Portals</p>
          <ul className="mt-5 space-y-2.5">
            {PORTALS.map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="link-underline text-[13px] text-ink-600 hover:text-ink-950 dark:text-ink-400 dark:hover:text-white"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-ink-950/10 pt-6 text-eyebrow uppercase text-ink-400 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <span>© {new Date().getFullYear()} AsraVerse AI · Government of India aligned</span>
        <a href="tel:18001801551" className="link-underline hover:text-ink-950 dark:hover:text-white">
          Kisan Call Centre · 1800 180 1551
        </a>
      </div>
    </div>
  </footer>
);
