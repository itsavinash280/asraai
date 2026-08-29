import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Button } from '../ui';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const getRoleHomePath = (role: UserRole): string => {
  switch (role) {
    case 'BUYER':
      return '/buyer';
    case 'EXPERT':
      return '/expert';
    case 'TRANSPORT':
      return '/transport';
    case 'ADMIN':
      return '/admin';
    case 'FARMER':
    default:
      return '/';
  }
};

export const LoadingSplashScreen: React.FC<{ message?: string }> = ({
  message = 'Verifying your session',
}) => (
  <div className="grain relative flex min-h-screen flex-col justify-between bg-ink-950 px-gutter py-14 text-paper-50">
    <p className="font-display text-lg font-semibold">
      AsraVerse<span className="text-agro-400">.</span>
    </p>

    <div>
      <p className="text-eyebrow uppercase text-white/40">One moment</p>
      <p className="mt-8 max-w-[14ch] font-display text-display-2 font-semibold">
        {message}
      </p>
    </div>

    <div
      className="h-px w-full overflow-hidden bg-white/10"
      role="progressbar"
      aria-label="Loading"
    >
      <div className="h-full w-1/3 bg-agro-400 animate-indeterminate" />
    </div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSplashScreen />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const roleHome = getRoleHomePath(user.role);

    return (
      <div className="flex min-h-[60vh] items-center">
        <div className="max-w-2xl">
          <p className="text-eyebrow uppercase text-ink-400">Error 403</p>

          <h1 className="mt-8 font-display text-display-3 font-semibold text-ink-950 dark:text-white">
            This section isn't part of your role.
          </h1>

          <p className="mt-8 max-w-measure-lg text-lede text-ink-500 dark:text-ink-400">
            It is reserved for{' '}
            <span className="text-ink-950 dark:text-white">
              {allowedRoles.join(', ')}
            </span>{' '}
            accounts. You are signed in as{' '}
            <span className="text-ink-950 dark:text-white">{user.role}</span>.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Button to={roleHome} variant="primary" size="lg" arrow>
              Back to your dashboard
            </Button>
            <Link
              to="/"
              className="link-underline text-[13px] text-ink-500 hover:text-ink-950 dark:text-ink-400 dark:hover:text-white"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
