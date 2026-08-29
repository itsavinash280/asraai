import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRoleHomePath } from '../common/ProtectedRoute';
import { Button } from '../ui';

/**
 * Marketing header.
 *
 * Sits transparent over the hero, then condenses to a blurred hairline bar
 * once the page scrolls. Mobile opens a full-screen menu rather than a
 * cramped dropdown.
 */

const NAV = [
  { label: 'Platform', href: '#capabilities' },
  { label: 'How it works', href: '#process' },
  { label: 'Who it serves', href: '#audience' },
  { label: 'About', href: '#about' },
];

export const SiteHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile menu, and allow Escape to close it.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const enterApp = () => {
    if (user?.role) navigate(getRoleHomePath(user.role));
    else navigate('/login');
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-editorial ${
          scrolled
            ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/10 py-4'
            : 'bg-transparent border-b border-transparent py-7'
        }`}
      >
        <div className="mx-auto w-full max-w-editorial px-gutter flex items-center justify-between gap-8">
          <Link
            to="/"
            className="text-white font-display font-semibold tracking-tight text-lg shrink-0"
          >
            AsraVerse<span className="text-agro-400">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-10">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-[13px] text-white/60 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-7 shrink-0">
            {!user && (
              <Link
                to="/login"
                className="link-underline text-[13px] text-white/60 hover:text-white transition-colors duration-300"
              >
                Log in
              </Link>
            )}
            <Button variant="inverse" size="sm" arrow onClick={enterApp}>
              {user ? 'Dashboard' : 'Get started'}
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 items-end"
          >
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-4 bg-white" />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-ink-950 lg:hidden transition-all duration-500 ease-editorial ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-gutter py-7">
          <span className="text-white font-display font-semibold text-lg">
            AsraVerse<span className="text-agro-400">.</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 grid place-items-center text-white"
          >
            <span className="relative block w-6 h-6">
              <span className="absolute top-1/2 left-0 h-px w-6 bg-white rotate-45" />
              <span className="absolute top-1/2 left-0 h-px w-6 bg-white -rotate-45" />
            </span>
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="px-gutter mt-8 flex flex-col border-t border-white/10"
        >
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-6 border-b border-white/10 text-display-4 font-display font-medium text-white flex items-baseline gap-5"
            >
              <span className="text-eyebrow text-white/30 tabular-nums">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-gutter mt-12 flex flex-col gap-4">
          <Button variant="inverse" size="lg" arrow onClick={enterApp} className="w-full">
            {user ? 'Go to dashboard' : 'Get started'}
          </Button>
          {!user && (
            <Button variant="outline" size="lg" to="/login" className="w-full">
              Log in
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
