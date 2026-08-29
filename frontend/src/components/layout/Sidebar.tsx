import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  ScanLine,
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  CloudSun,
  Award,
  User,
  ShieldAlert,
  Truck,
  MessageSquareHeart,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const role = user?.role || 'FARMER';

  const navItems = [
    // Farmer Items
    { label: 'Farmer Dashboard', to: '/', icon: LayoutDashboard, roles: ['FARMER'] },
    {
      label: 'AI Crop Recommend',
      to: '/crop-recommendation',
      icon: Sprout,
      roles: ['FARMER', 'EXPERT', 'ADMIN'],
      badge: 'AI',
    },
    {
      label: 'Disease Detection',
      to: '/disease-detection',
      icon: ScanLine,
      roles: ['FARMER', 'EXPERT', 'ADMIN'],
      badge: 'CNN',
    },
    {
      label: 'Mandi Price Forecast',
      to: '/price-prediction',
      icon: TrendingUp,
      roles: ['FARMER', 'BUYER', 'ADMIN'],
      badge: 'Forecast',
    },
    { label: 'Crop Marketplace', to: '/marketplace', icon: ShoppingBag, roles: ['FARMER', 'BUYER', 'ADMIN'] },
    {
      label: 'My Orders & Invoices',
      to: '/orders',
      icon: Package,
      roles: ['FARMER', 'BUYER', 'TRANSPORT', 'ADMIN'],
    },
    { label: 'Agricultural Experts', to: '/expert-consultation', icon: Users, roles: ['FARMER', 'EXPERT', 'ADMIN'] },
    {
      label: 'Weather & Advisory',
      to: '/weather',
      icon: CloudSun,
      roles: ['FARMER', 'BUYER', 'EXPERT', 'TRANSPORT', 'ADMIN'],
    },
    {
      label: 'Govt Schemes (PM-Kisan)',
      to: '/schemes',
      icon: Award,
      roles: ['FARMER', 'BUYER', 'EXPERT', 'ADMIN'],
    },

    // Role dashboards
    { label: 'Buyer Dashboard', to: '/buyer', icon: LayoutDashboard, roles: ['BUYER'] },
    { label: 'Expert Dashboard', to: '/expert', icon: MessageSquareHeart, roles: ['EXPERT'] },
    { label: 'Transport Deliveries', to: '/transport', icon: Truck, roles: ['TRANSPORT'] },
    { label: 'Admin Control Center', to: '/admin', icon: ShieldAlert, roles: ['ADMIN'] },

    // Farm Profile
    { label: 'Farm Profile', to: '/profile', icon: User, roles: ['FARMER'] },
  ];

  const filteredNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Section navigation"
        className={`fixed bottom-0 left-0 top-16 z-40 w-72 overflow-y-auto border-r border-ink-950/10 bg-paper-100 transition-transform duration-500 ease-editorial lg:translate-x-0 dark:border-white/10 dark:bg-ink-950 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex min-h-full flex-col px-7 py-8">
          {/* Identity */}
          <div>
            <p className="text-eyebrow uppercase text-ink-400">Signed in</p>
            <p className="mt-3 truncate font-display text-lg font-medium text-ink-950 dark:text-white">
              {user?.name || 'Kisan User'}
            </p>
            <p className="mt-1 text-eyebrow uppercase text-agro-600 dark:text-agro-400">
              {role}
            </p>
          </div>

          {/* Navigation */}
          <nav className="mt-10">
            <p className="text-eyebrow uppercase text-ink-400">Navigation</p>
            <ul className="mt-4 border-t border-ink-950/10 dark:border-white/10">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3.5 border-b py-3.5 text-[13px] transition-colors duration-300 ${
                          isActive
                            ? 'border-ink-950/10 text-ink-950 dark:border-white/10 dark:text-white'
                            : 'border-ink-950/10 text-ink-500 hover:text-ink-950 dark:border-white/10 dark:text-ink-400 dark:hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={`absolute -left-7 h-4 w-[2px] bg-agro-500 transition-transform duration-500 ease-editorial ${
                              isActive ? 'scale-y-100' : 'scale-y-0'
                            }`}
                          />
                          <Icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isActive ? 'text-agro-600 dark:text-agro-400' : ''
                            }`}
                            aria-hidden="true"
                          />
                          <span className="flex-1 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] uppercase tracking-wider text-ink-400">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Helpline */}
          <div className="mt-auto pt-10">
            <div className="border-t border-ink-950/10 pt-6 dark:border-white/10">
              <p className="text-eyebrow uppercase text-ink-400">Kisan helpline · 24×7</p>
              <p className="mt-3 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                Free agricultural expert advice and claim status.
              </p>
              <a
                href="tel:18001801551"
                className="link-underline mt-4 inline-block font-display text-xl font-medium text-ink-950 dark:text-white"
              >
                1800 180 1551
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
