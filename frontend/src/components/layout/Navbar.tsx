import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mic,
  ShoppingCart,
  LogOut,
  Sun,
  Moon,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useVoiceAssistant } from '../../context/VoiceAssistantContext';

const PORTALS = [
  { to: '/admin/login', label: 'Administration' },
  { to: '/expert/login', label: 'KVK agri expert' },
  { to: '/transport/login', label: 'Logistics partner' },
];

export const Navbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { openVoiceAssistant, isSpeaking } = useVoiceAssistant();
  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Close the profile menu on outside click or Escape.
  useEffect(() => {
    if (!profileDropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setProfileDropdownOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [profileDropdownOpen]);

  const iconButton =
    'grid h-10 w-10 place-items-center rounded-full text-ink-500 transition-colors duration-300 hover:bg-ink-950/[0.04] hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/5 dark:hover:text-white';

  return (
    <header className="sticky top-0 z-40 border-b border-ink-950/10 bg-paper-100/85 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/85">
      <div className="flex h-16 items-center justify-between gap-4 px-gutter">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className={`${iconButton} lg:hidden`}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <Link
            to="/"
            className="font-display text-lg font-semibold tracking-tight text-ink-950 dark:text-white"
          >
            AsraVerse<span className="text-agro-600 dark:text-agro-400">.</span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={openVoiceAssistant}
            className="group mr-1 hidden items-center gap-2.5 rounded-full border border-ink-950/15 py-2 pl-3.5 pr-4 text-[13px] text-ink-700 transition-colors duration-300 hover:border-ink-950/40 sm:flex dark:border-white/15 dark:text-ink-200 dark:hover:border-white/40"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full bg-agro-500 ${isSpeaking ? 'animate-ping' : ''}`}
            />
            <Mic className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Voice</span>
            <span className="text-ink-400">हिंदी</span>
          </button>

          <Link to="/cart" className={`${iconButton} relative`} aria-label="Cart">
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-agro-600 px-1 text-[10px] font-semibold tabular-nums text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleDarkMode}
            className={iconButton}
            aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {user ? (
            <div className="relative ml-1" ref={menuRef}>
              <button
                onClick={() => setProfileDropdownOpen((o) => !o)}
                aria-expanded={profileDropdownOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 transition-colors duration-300 hover:bg-ink-950/[0.04] dark:hover:bg-white/5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-xs font-semibold text-paper-50 dark:bg-white dark:text-ink-950">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden text-[13px] text-ink-700 sm:block dark:text-ink-200">
                  {user.name}
                </span>
              </button>

              {profileDropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 border border-ink-950/10 bg-paper-50 p-5 shadow-xl shadow-ink-950/5 dark:border-white/10 dark:bg-ink-900"
                >
                  <p className="text-eyebrow uppercase text-ink-400">
                    {user.role}
                  </p>
                  <p className="mt-2 truncate text-sm text-ink-950 dark:text-white">
                    {user.email}
                  </p>

                  <div className="mt-5 border-t border-ink-950/10 pt-4 dark:border-white/10">
                    <p className="text-eyebrow uppercase text-ink-400">Portals</p>
                    <ul className="mt-3 space-y-2.5">
                      {PORTALS.map((p) => (
                        <li key={p.to}>
                          <Link
                            to={p.to}
                            role="menuitem"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="link-underline text-[13px] text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
                          >
                            {p.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    role="menuitem"
                    onClick={async () => {
                      setProfileDropdownOpen(false);
                      await logout();
                      navigate('/login', { replace: true });
                    }}
                    className="mt-5 flex w-full items-center gap-2 border-t border-ink-950/10 pt-4 text-[13px] text-rose-600 transition-opacity hover:opacity-70 dark:border-white/10 dark:text-rose-400"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-2 rounded-full bg-ink-950 px-6 py-2.5 text-[13px] text-paper-50 transition-colors duration-300 hover:bg-agro-600 dark:bg-white dark:text-ink-950"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
