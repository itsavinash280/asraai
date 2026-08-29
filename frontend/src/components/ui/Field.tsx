import React, { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Form field for the auth screens.
 *
 * Underline-only inputs rather than boxed ones — it keeps the auth screens in
 * the same editorial language as the rest of the site. The label is always a
 * real <label> tied to the input by id, and errors are wired through
 * aria-describedby / aria-invalid so screen readers announce them.
 */

export interface FieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
  label: string;
  hint?: string;
  error?: string;
  tone?: 'dark' | 'light';
  icon?: React.ReactNode;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({
  label,
  hint,
  error,
  tone = 'dark',
  icon,
  className = '',
  ...inputProps
}) => {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const labelTone = tone === 'dark' ? 'text-white/45' : 'text-ink-500';
  const inputTone =
    tone === 'dark'
      ? 'text-white placeholder:text-white/25 border-white/15 focus:border-agro-400'
      : 'text-ink-950 placeholder:text-ink-300 border-ink-950/15 focus:border-agro-600';

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`block text-eyebrow uppercase mb-3 ${labelTone}`}
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            aria-hidden="true"
            className={`absolute left-0 top-1/2 -translate-y-1/2 ${
              tone === 'dark' ? 'text-white/30' : 'text-ink-400'
            }`}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`w-full bg-transparent border-b pb-3 text-base outline-none
            transition-colors duration-300 ${inputTone}
            ${icon ? 'pl-7' : ''}
            ${error ? '!border-rose-400' : ''}`}
          {...inputProps}
        />
      </div>

      {hint && !error && (
        <p
          id={`${id}-hint`}
          className={`mt-2.5 text-xs ${tone === 'dark' ? 'text-white/35' : 'text-ink-400'}`}
        >
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2.5 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
};

/** Password field with an accessible show/hide toggle. */
export const PasswordField: React.FC<Omit<FieldProps, 'type'>> = ({
  tone = 'dark',
  className = '',
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Field {...props} tone={tone} type={visible ? 'text' : 'password'} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className={`absolute right-0 bottom-3 transition-opacity hover:opacity-100 ${
          tone === 'dark' ? 'text-white/40' : 'text-ink-400'
        }`}
      >
        {visible ? (
          <EyeOff className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Eye className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
