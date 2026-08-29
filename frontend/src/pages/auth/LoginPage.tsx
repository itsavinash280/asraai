import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useAuth, AVAILABLE_ROLES } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { getRoleHomePath } from '../../components/common/ProtectedRoute';
import { EmailVerificationScreen } from '../../components/auth/EmailVerificationScreen';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button, Field, PasswordField } from '../../components/ui';

export interface LoginPageProps {
  initialRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialRole }) => {
  const { user, login, register, loginWithGoogle, resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole || 'FARMER');

  const [actionLoading, setActionLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Role Selection Modal for Google Sign In
  const [showGoogleRoleModal, setShowGoogleRoleModal] = useState(false);

  // Email Verification Screen
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);

  // If user is already authenticated, redirect to destination or role dashboard
  useEffect(() => {
    if (user && user.role) {
      const from = (location.state as any)?.from?.pathname;
      const targetPath = from || getRoleHomePath(user.role);
      navigate(targetPath, { replace: true });
    }
  }, [user, navigate, location]);

  // Set default initialRole if supplied via props or state
  useEffect(() => {
    const stateRole = (location.state as any)?.initialRole;
    if (stateRole) {
      setSelectedRole(stateRole);
    } else if (initialRole) {
      setSelectedRole(initialRole);
    }
  }, [initialRole, location.state]);

  const goAfterAuth = (roleForNav: UserRole) => {
    const from = (location.state as any)?.from?.pathname;
    navigate(from || getRoleHomePath(roleForNav), { replace: true });
  };

  // Handle standard Form Submit (Sign In or Register)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setNoticeMsg(null);
    setActionLoading(true);

    if (isRegisterMode) {
      const res = await register({ name, email, phone, password, role: selectedRole });
      setActionLoading(false);

      if (res.needsVerification && res.verificationEmail) {
        setVerificationEmail(res.verificationEmail);
      } else if (res.success && res.role) {
        goAfterAuth(res.role);
      } else {
        setErrorMsg(res.message || 'Registration failed. Please check your details.');
      }
    } else {
      const res = await login(email, password);
      setActionLoading(false);

      if (res.needsVerification && res.verificationEmail) {
        setVerificationEmail(res.verificationEmail);
      } else if (res.success && res.role) {
        goAfterAuth(res.role);
      } else {
        setErrorMsg(res.message || 'Invalid email or password.');
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async (roleToUse: UserRole = selectedRole) => {
    setErrorMsg(null);
    setNoticeMsg(null);
    setGoogleLoading(true);
    setShowGoogleRoleModal(false);

    const res = await loginWithGoogle(roleToUse);
    setGoogleLoading(false);

    if (res.needsVerification && res.verificationEmail) {
      setVerificationEmail(res.verificationEmail);
    } else if (res.success && res.role) {
      goAfterAuth(res.role);
    } else {
      setErrorMsg(res.message || 'Google Sign-In could not be completed.');
    }
  };

  // Forgot password
  const handleForgotPassword = async () => {
    setErrorMsg(null);
    setNoticeMsg(null);
    const res = await resetPassword(email);
    if (res.success) setNoticeMsg(res.message || 'Reset link sent.');
    else setErrorMsg(res.message || 'Could not send the reset link.');
  };

  // Quick Demo account auto-fill & login
  const handleQuickDemo = async (role: UserRole) => {
    setErrorMsg(null);
    setNoticeMsg(null);
    setActionLoading(true);

    let demoEmail = 'farmer1@asraverse.in';
    const demoPass = 'Password@123';

    if (role === 'BUYER') demoEmail = 'buyer.organic@harvest.com';
    else if (role === 'EXPERT') demoEmail = 'anita.verma@kvk.org.in';
    else if (role === 'TRANSPORT') demoEmail = 'logistics.ramesh@express.in';
    else if (role === 'ADMIN') demoEmail = 'admin@asraverse.in';

    setEmail(demoEmail);
    setPassword(demoPass);

    const res = await login(demoEmail, demoPass);
    setActionLoading(false);

    if (res.needsVerification && res.verificationEmail) {
      setVerificationEmail(res.verificationEmail);
    } else if (res.success && res.role) {
      goAfterAuth(res.role);
    } else {
      setErrorMsg(res.message || 'Demo account login failed.');
    }
  };

  if (verificationEmail) {
    return <EmailVerificationScreen email={verificationEmail} />;
  }

  const registerRoles = AVAILABLE_ROLES.filter((r) => r.role !== 'ADMIN');

  return (
    <AuthLayout
      eyebrow={isRegisterMode ? 'Create an account' : 'Welcome back'}
      title={
        isRegisterMode ? (
          <>
            Start this <span className="text-agro-400">season.</span>
          </>
        ) : (
          <>
            Back to the <span className="text-agro-400">field.</span>
          </>
        )
      }
      lede={
        isRegisterMode
          ? 'Crop planning, leaf diagnosis, price forecasting and direct trade — free for every Indian farmer.'
          : 'Sign in to your advisory, marketplace and mandi intelligence.'
      }
    >
      {/* Mode switch */}
      <div
        className="flex items-center gap-8 border-b border-white/10 pb-5"
        role="tablist"
        aria-label="Authentication mode"
      >
        {[
          { label: 'Sign in', reg: false },
          { label: 'Create account', reg: true },
        ].map((tab) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={isRegisterMode === tab.reg}
            onClick={() => {
              setIsRegisterMode(tab.reg);
              setErrorMsg(null);
              setNoticeMsg(null);
            }}
            className={`link-underline text-[13px] transition-colors duration-300 ${
              isRegisterMode === tab.reg ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => {
          if (isRegisterMode) setShowGoogleRoleModal(true);
          else handleGoogleSignIn(selectedRole);
        }}
        disabled={googleLoading || actionLoading}
        className="mt-10 flex w-full items-center justify-center gap-3 rounded-full border border-white/20 py-4 text-[13px] text-white transition-colors duration-500 hover:border-white/50 disabled:opacity-40"
      >
        {googleLoading ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
        )}
        <span>Continue with Google</span>
      </button>

      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-eyebrow uppercase text-white/30">or</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Messages */}
      {errorMsg && (
        <div role="alert" className="mb-8 border-l-2 border-rose-400 pl-4 text-sm text-rose-300">
          {errorMsg}
        </div>
      )}
      {noticeMsg && (
        <div role="status" className="mb-8 flex gap-3 border-l-2 border-agro-400 pl-4 text-sm text-agro-300">
          <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{noticeMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {isRegisterMode && (
          <Field
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ramesh Kumar"
            autoComplete="name"
            required
          />
        )}

        <Field
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        {isRegisterMode && (
          <Field
            label="Phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        )}

        <div>
          <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
            hint={isRegisterMode ? 'At least 6 characters.' : undefined}
            required
          />
          {!isRegisterMode && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="link-underline mt-4 text-xs text-white/40 hover:text-white"
            >
              Forgot your password?
            </button>
          )}
        </div>

        {isRegisterMode && (
          <fieldset>
            <legend className="mb-4 block text-eyebrow uppercase text-white/45">
              Account role
            </legend>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {registerRoles.map((r) => (
                <label
                  key={r.role}
                  className={`flex cursor-pointer items-center gap-3 border-b py-3.5 text-sm transition-colors duration-300 ${
                    selectedRole === r.role
                      ? 'border-agro-400 text-white'
                      : 'border-white/10 text-white/45 hover:text-white/80'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.role}
                    checked={selectedRole === r.role}
                    onChange={() => setSelectedRole(r.role)}
                    className="sr-only"
                  />
                  <span aria-hidden="true">{r.icon}</span>
                  <span>{r.title}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <Button
          type="submit"
          variant="inverse"
          size="lg"
          arrow
          loading={actionLoading || isLoading}
          className="w-full"
        >
          {isRegisterMode ? 'Create account' : 'Sign in'}
        </Button>
      </form>

      {/* Demo accounts — kept from the previous build */}
      <div className="mt-12 border-t border-white/10 pt-6">
        <p className="text-eyebrow uppercase text-white/30">Demo profiles</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {(['FARMER', 'BUYER', 'EXPERT', 'ADMIN'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleQuickDemo(r)}
              className="link-underline text-xs text-white/40 hover:text-white"
            >
              {r.charAt(0) + r.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Google role modal */}
      {showGoogleRoleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Select your account type"
        >
          <div className="w-full max-w-md">
            <p className="text-eyebrow uppercase text-white/40">Select your role</p>
            <p className="mt-6 font-display text-display-4 font-medium text-white">
              How will you use AsraVerse?
            </p>
            <div className="mt-10">
              {registerRoles.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleGoogleSignIn(r.role)}
                  className="group flex w-full items-center gap-4 border-b border-white/10 py-5 text-left text-white/60 transition-colors hover:text-white"
                >
                  <span aria-hidden="true" className="text-lg">
                    {r.icon}
                  </span>
                  <span className="font-display text-lg font-medium transition-transform duration-500 ease-editorial group-hover:translate-x-1.5">
                    {r.title}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowGoogleRoleModal(false)}
              className="link-underline mt-8 text-xs text-white/40 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Link
        to="/"
        className="mt-12 inline-flex items-center gap-2 text-xs text-white/35 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to homepage
      </Link>
    </AuthLayout>
  );
};
