import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  ArrowLeft,
  Sparkles,
  Shield,
} from 'lucide-react';
import { useAuth, AVAILABLE_ROLES } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { getRoleHomePath } from '../../components/common/ProtectedRoute';

export interface LoginPageProps {
  initialRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialRole }) => {
  const { user, login, register, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole || 'FARMER');

  const [actionLoading, setActionLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Role Selection Modal for Google Sign In
  const [showGoogleRoleModal, setShowGoogleRoleModal] = useState(false);

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

  // Handle standard Form Submit (Sign In or Register)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setActionLoading(true);

    if (isRegisterMode) {
      const res = await register({
        name,
        email,
        phone,
        password,
        role: selectedRole,
      });
      setActionLoading(false);

      if (res.success && res.role) {
        const from = (location.state as any)?.from?.pathname;
        navigate(from || getRoleHomePath(res.role), { replace: true });
      } else {
        setErrorMsg(res.message || 'Registration failed. Please check your details.');
      }
    } else {
      const res = await login(email, password);
      setActionLoading(false);

      if (res.success && res.role) {
        const from = (location.state as any)?.from?.pathname;
        navigate(from || getRoleHomePath(res.role), { replace: true });
      } else {
        setErrorMsg(res.message || 'Invalid email or password.');
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async (roleToUse: UserRole = selectedRole) => {
    setErrorMsg(null);
    setGoogleLoading(true);
    setShowGoogleRoleModal(false);

    const res = await loginWithGoogle(roleToUse);
    setGoogleLoading(false);

    if (res.success && res.role) {
      const from = (location.state as any)?.from?.pathname;
      navigate(from || getRoleHomePath(res.role), { replace: true });
    } else {
      setErrorMsg(res.message || 'Google Sign-In could not be completed.');
    }
  };

  // Quick Demo account auto-fill & login
  const handleQuickDemo = async (role: UserRole) => {
    setErrorMsg(null);
    setActionLoading(true);

    let demoEmail = 'farmer1@asraverse.in';
    let demoPass = 'Password@123';

    if (role === 'BUYER') {
      demoEmail = 'buyer.organic@harvest.com';
    } else if (role === 'EXPERT') {
      demoEmail = 'anita.verma@kvk.org.in';
    } else if (role === 'TRANSPORT') {
      demoEmail = 'logistics.ramesh@express.in';
    } else if (role === 'ADMIN') {
      demoEmail = 'admin@asraverse.in';
    }

    setEmail(demoEmail);
    setPassword(demoPass);

    const res = await login(demoEmail, demoPass);
    setActionLoading(false);

    if (res.success && res.role) {
      const from = (location.state as any)?.from?.pathname;
      navigate(from || getRoleHomePath(res.role), { replace: true });
    } else {
      setErrorMsg(res.message || 'Demo account login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 py-12 select-none relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Back Navigation */}
      <div className="max-w-lg w-full mb-4 flex items-center justify-between z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-agro-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage (मुख्य पृष्ठ पर लौटें)</span>
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-agro-500 to-emerald-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/25 hover:scale-105 transition">
              <Sprout className="w-8 h-8" />
            </div>
          </Link>
          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-2xl font-black text-white">
              Asra<span className="text-agro-400">Verse</span> AI
            </h1>
            <span className="text-[10px] font-extrabold bg-agro-500/20 text-agro-300 px-2 py-0.5 rounded-full border border-agro-500/30">
              National Portal
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            {isRegisterMode
              ? 'Create your digital agriculture account to access AI advisories & Mandi trade'
              : 'Sign in to access your AI Crop Advisory, Mandi Marketplace & Agri Intelligence'}
          </p>
        </div>

        {/* Google Authentication Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              if (isRegisterMode) {
                setShowGoogleRoleModal(true);
              } else {
                handleGoogleSignIn(selectedRole);
              }
            }}
            disabled={googleLoading || actionLoading}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-white font-bold text-xs flex items-center justify-center gap-3 transition shadow-sm hover:border-slate-600 active:scale-[0.98] disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google (Google से जारी रखें)</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800" />
            <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Or with Email / Password
            </span>
            <div className="flex-grow border-t border-slate-800" />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-800/60 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(false);
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              !isRegisterMode
                ? 'bg-agro-600 text-white shadow-md shadow-agro-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              isRegisterMode
                ? 'bg-agro-600 text-white shadow-md shadow-agro-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-xs font-semibold text-rose-300 animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in">
          {isRegisterMode && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Full Name (पूरा नाम)
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-agro-500 focus:outline-none placeholder:text-slate-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
              Email Address or Mobile Number (ईमेल / मोबाइल)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer1@asraverse.in or 9876543210"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-agro-500 focus:outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

          {isRegisterMode && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                Phone Number (मोबाइल नंबर)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-agro-500 focus:outline-none placeholder:text-slate-600"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Password (पासवर्ड)
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-agro-500 focus:outline-none placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegisterMode && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Account Role (खाता प्रकार)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_ROLES.filter((r) => r.role !== 'ADMIN').map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2 transition ${
                      selectedRole === r.role
                        ? 'border-agro-500 bg-agro-950/70 text-agro-300 shadow-sm'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{r.icon}</span>
                    <div className="overflow-hidden">
                      <span className="block truncate">{r.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal block truncate">
                        ({r.titleHi})
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={actionLoading || isLoading}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-agro-500 to-emerald-600 hover:from-agro-600 hover:to-emerald-700 text-white font-bold text-xs transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 mt-2"
          >
            {actionLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isRegisterMode ? 'Complete Registration & Enter' : 'Sign In to AsraVerse'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Instant Demo Login Switcher */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-agro-400" />
              1-Click Demo Testing Accounts:
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">Live Credentials</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('FARMER')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-agro-500 text-left text-xs transition"
            >
              <div className="font-bold text-white flex items-center gap-1">🌾 Farmer</div>
              <div className="text-[10px] text-slate-400">Ramesh K.</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('BUYER')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-agro-500 text-left text-xs transition"
            >
              <div className="font-bold text-white flex items-center gap-1">🛒 Buyer</div>
              <div className="text-[10px] text-slate-400">Suresh P.</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('EXPERT')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-agro-500 text-left text-xs transition"
            >
              <div className="font-bold text-white flex items-center gap-1">🔬 Expert</div>
              <div className="text-[10px] text-slate-400">Dr. Anita</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-agro-500 text-left text-xs transition"
            >
              <div className="font-bold text-white flex items-center gap-1">🛡️ Admin</div>
              <div className="text-[10px] text-slate-400">Platform</div>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Agriculture Governance & Encrypted Session Security</span>
          </div>
        </div>
      </div>

      {/* Google Role Selection Modal */}
      {showGoogleRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-white">Select Your Account Type</h3>
              <p className="text-xs text-slate-400">
                Please choose your primary role for Google Authentication
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {AVAILABLE_ROLES.filter((r) => r.role !== 'ADMIN').map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleGoogleSignIn(r.role)}
                  className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950 hover:border-agro-500 text-left flex items-center gap-3 transition"
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <div className="font-bold text-white text-xs">
                      {r.title} ({r.titleHi})
                    </div>
                    <div className="text-[10px] text-slate-400">{r.badge}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowGoogleRoleModal(false)}
              className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

