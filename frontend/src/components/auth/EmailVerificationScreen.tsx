import React from 'react';
import { Mail, ArrowLeft, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface EmailVerificationScreenProps {
  email: string;
  onLoginClick?: () => void;
}

export const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({
  email,
  onLoginClick,
}) => {
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
          <span>Back to Homepage</span>
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
              Verify Email
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Confirm your email address to complete registration
          </p>
        </div>

        {/* Email Verification Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-agro-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Mail className="w-12 h-12 text-emerald-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4 text-center">
          <div>
            <h2 className="text-xl font-black text-white mb-2">Verify Your Email</h2>
            <p className="text-sm text-slate-300">
              We have sent you a verification email to
            </p>
            <p className="text-sm font-bold text-agro-300 mt-1 break-all">{email}</p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
            <p className="font-semibold text-white">Next steps:</p>
            <ol className="list-decimal list-inside space-y-1.5 text-left">
              <li>Check your inbox for the verification email</li>
              <li>Click the verification link in the email</li>
              <li>Return here and log in with your credentials</li>
            </ol>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-3 text-xs text-emerald-300">
            <p>💡 Tip: Check your spam folder if you don't see the email.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            to="/login"
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-agro-500 to-emerald-600 hover:from-agro-600 hover:to-emerald-700 text-white font-bold text-xs transition shadow-lg shadow-emerald-500/25 flex items-center justify-center active:scale-95"
          >
            <span>Go to Login</span>
          </Link>

          <Link
            to="/register"
            className="w-full py-3 px-5 rounded-2xl border border-slate-700 bg-slate-950 hover:border-slate-600 text-slate-300 hover:text-white font-bold text-xs transition flex items-center justify-center active:scale-95"
          >
            <span>Use Different Email</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-800">
          <p>Verification links typically expire after 24 hours. Create a new account if your link has expired.</p>
        </div>
      </div>
    </div>
  );
};
