import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui';

export interface EmailVerificationScreenProps {
  email: string;
  onLoginClick?: () => void;
}

const STEPS = [
  'Open the message in your inbox',
  'Follow the verification link',
  'Return here and log in',
];

export const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = ({
  email,
  onLoginClick,
}) => (
  <AuthLayout
    eyebrow="One step left"
    title={
      <>
        Check your <span className="text-agro-400">inbox.</span>
      </>
    }
    lede="Verifying your address keeps your land profile, orders and advisory history tied to you alone."
  >
    <p className="text-lede text-white/60">
      We have sent you a verification email to{' '}
      <span className="text-white">{email}</span>. Please verify it and log in.
    </p>

    <ol className="mt-12 border-t border-white/10">
      {STEPS.map((step, i) => (
        <li
          key={step}
          className="flex items-baseline gap-6 border-b border-white/10 py-5 text-sm text-white/55"
        >
          <span className="text-eyebrow tabular-nums text-white/30">0{i + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>

    <p className="mt-8 text-xs text-white/35">
      No message after a minute or two? Check your spam folder — verification
      links expire after 24 hours.
    </p>

    <div className="mt-12 flex flex-wrap items-center gap-4">
      <Button
        variant="inverse"
        size="lg"
        arrow
        to="/login"
        onClick={onLoginClick}
      >
        Log in
      </Button>
      <Link
        to="/register"
        className="link-underline text-[13px] text-white/45 hover:text-white"
      >
        Use a different email
      </Link>
    </div>
  </AuthLayout>
);
