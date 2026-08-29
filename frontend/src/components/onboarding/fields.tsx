import React, { useState } from 'react';
import { Check, ChevronDown, Plus, X } from 'lucide-react';
import { FieldDef } from './schema';

/* -------------------------------------------------------------------------- */
/*  Dotted-path helpers — bankAccount.ifscCode and friends                    */
/* -------------------------------------------------------------------------- */

export const getPath = (source: Record<string, any>, path: string): any =>
  path.split('.').reduce<any>((acc, part) => (acc == null ? undefined : acc[part]), source);

/** Immutable set; intermediate objects are created as needed. */
export const setPath = (
  source: Record<string, any>,
  path: string,
  value: any,
): Record<string, any> => {
  const [head, ...rest] = path.split('.');

  if (rest.length === 0) return { ...source, [head]: value };

  return {
    ...source,
    [head]: setPath((source[head] as Record<string, any>) || {}, rest.join('.'), value),
  };
};

/* -------------------------------------------------------------------------- */
/*  Validation                                                                */
/* -------------------------------------------------------------------------- */

const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  return String(value).trim() === '';
};

/** Format rules that apply whenever a value is present, required or not. */
const formatError = (key: string, value: any): string | null => {
  const text = String(value ?? '').trim();
  if (!text) return null;

  switch (key) {
    case 'pincode':
      return /^[1-9][0-9]{5}$/.test(text) ? null : 'Enter a valid 6-digit PIN code.';
    case 'farmSizeAcres':
      return Number(text) > 0 ? null : 'Farm size must be greater than zero.';
    case 'gstin':
      return text.length === 15 ? null : 'A GSTIN is exactly 15 characters.';
    case 'bankAccount.ifscCode':
      return /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(text) ? null : 'IFSC looks like SBIN0001234.';
    default:
      return null;
  }
};

export type FieldErrors = Record<string, string>;

/**
 * Validate one step. Required fields must be filled; optional ones are only
 * checked for format. The bank block is all-or-nothing so a half-entered
 * account never reaches a payout run.
 */
export const validateFields = (
  fields: FieldDef[],
  draft: Record<string, any>,
): FieldErrors => {
  const errors: FieldErrors = {};

  fields.forEach((field) => {
    const value = getPath(draft, field.key);

    if (field.required && isEmpty(value)) {
      errors[field.key] = `${field.label.replace(/ \(optional\)$/, '')} is required.`;
      return;
    }

    const format = formatError(field.key, value);
    if (format) errors[field.key] = format;
  });

  const bankKeys = fields.filter((f) => f.key.startsWith('bankAccount.')).map((f) => f.key);
  if (bankKeys.length > 0) {
    const filled = bankKeys.filter((key) => !isEmpty(getPath(draft, key)));
    if (filled.length > 0 && filled.length < bankKeys.length) {
      bankKeys
        .filter((key) => isEmpty(getPath(draft, key)) && !errors[key])
        .forEach((key) => {
          errors[key] = 'Complete every bank detail, or leave the whole block empty.';
        });
    }
  }

  return errors;
};

/* -------------------------------------------------------------------------- */
/*  Inputs                                                                    */
/* -------------------------------------------------------------------------- */

const shell =
  'w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-[15px] text-ink-950 outline-none ' +
  'transition-colors duration-300 placeholder:text-ink-300 ' +
  'dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/25';

const shellIdle = 'border-ink-950/10 focus:border-agro-600 dark:border-white/10 dark:focus:border-agro-400';
const shellError = 'border-rose-400 dark:border-rose-400/70';

const Label: React.FC<{ field: FieldDef; htmlFor: string }> = ({ field, htmlFor }) => (
  <label htmlFor={htmlFor} className="mb-2.5 flex items-baseline gap-2">
    <span className="text-eyebrow uppercase text-ink-500 dark:text-white/45">{field.label}</span>
    {field.labelHi && (
      <span className="text-[11px] text-ink-400 dark:text-white/30">{field.labelHi}</span>
    )}
    {field.required && <span className="text-[11px] text-agro-600 dark:text-agro-400">*</span>}
  </label>
);

interface ChipsProps {
  id: string;
  values: string[];
  suggestions?: string[];
  invalid: boolean;
  onChange: (next: string[]) => void;
}

/** Free-text tag entry with tap-to-add presets — used for crops / commodities. */
const ChipsInput: React.FC<ChipsProps> = ({ id, values, suggestions = [], invalid, onChange }) => {
  const [entry, setEntry] = useState('');

  const add = (raw: string) => {
    const next = raw.trim();
    if (!next) return;
    const exists = values.some((v) => v.toLowerCase() === next.toLowerCase());
    if (!exists) onChange([...values, next]);
    setEntry('');
  };

  const remove = (value: string) => onChange(values.filter((v) => v !== value));

  const unused = suggestions.filter(
    (s) => !values.some((v) => v.toLowerCase() === s.toLowerCase()),
  );

  return (
    <div>
      <div className="flex gap-2">
        <input
          id={id}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add(entry);
            }
          }}
          placeholder="Type and press Enter"
          className={`${shell} ${invalid ? shellError : shellIdle}`}
        />
        <button
          type="button"
          onClick={() => add(entry)}
          aria-label="Add"
          className="shrink-0 rounded-2xl border border-ink-950/10 px-4 text-ink-500 transition-colors hover:border-ink-950/40 hover:text-ink-950 dark:border-white/10 dark:text-white/50 dark:hover:border-white/40 dark:hover:text-white"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {values.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {values.map((value) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => remove(value)}
                className="group/chip inline-flex items-center gap-1.5 rounded-full bg-agro-600 py-1.5 pl-3.5 pr-2.5 text-[12px] font-medium text-white transition-colors hover:bg-ink-950"
              >
                {value}
                <X className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                <span className="sr-only">Remove {value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {unused.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {unused.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => add(suggestion)}
                className="rounded-full border border-dashed border-ink-950/20 px-3.5 py-1.5 text-[12px] text-ink-500 transition-colors hover:border-agro-600 hover:text-agro-700 dark:border-white/15 dark:text-white/45 dark:hover:border-agro-400 dark:hover:text-agro-300"
              >
                + {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export interface WizardFieldProps {
  field: FieldDef;
  value: any;
  error?: string;
  onChange: (value: any) => void;
}

export const WizardField: React.FC<WizardFieldProps> = ({ field, value, error, onChange }) => {
  const id = `onb-${field.key.replace(/\./g, '-')}`;
  const invalid = Boolean(error);
  const describedBy = error ? `${id}-error` : field.hint ? `${id}-hint` : undefined;
  const box = `${shell} ${invalid ? shellError : shellIdle}`;

  return (
    <div className={field.half ? 'sm:col-span-1' : 'sm:col-span-2'}>
      <Label field={field} htmlFor={id} />

      {field.kind === 'select' && (
        <div className="relative">
          <select
            id={id}
            value={value ?? ''}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.value)}
            className={`${box} appearance-none pr-11`}
          >
            <option value="">Select…</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.labelHi ? `${option.label} — ${option.labelHi}` : option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400 dark:text-white/40"
          />
        </div>
      )}

      {field.kind === 'textarea' && (
        <textarea
          id={id}
          rows={3}
          value={value ?? ''}
          placeholder={field.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={`${box} resize-none`}
        />
      )}

      {field.kind === 'chips' && (
        <ChipsInput
          id={id}
          values={Array.isArray(value) ? value : []}
          suggestions={field.suggestions}
          invalid={invalid}
          onChange={onChange}
        />
      )}

      {(field.kind === 'text' || field.kind === 'number') && (
        <input
          id={id}
          type={field.kind === 'number' ? 'number' : 'text'}
          inputMode={field.kind === 'number' ? 'decimal' : undefined}
          step={field.kind === 'number' ? 'any' : undefined}
          min={field.kind === 'number' ? 0 : undefined}
          value={value ?? ''}
          placeholder={field.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={box}
        />
      )}

      {field.hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ink-400 dark:text-white/35">
          {field.hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-rose-500 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
};

/** Small numbered progress rail shown above the form. */
export const StepIndicator: React.FC<{
  labels: string[];
  current: number;
}> = ({ labels, current }) => (
  <ol className="flex items-center gap-3">
    {labels.map((label, index) => {
      const done = index < current;
      const active = index === current;

      return (
        <li key={label} className="flex flex-1 items-center gap-3">
          <span
            aria-current={active ? 'step' : undefined}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-500 ${
              done
                ? 'bg-agro-600 text-white'
                : active
                  ? 'bg-ink-950 text-paper-50 dark:bg-white dark:text-ink-950'
                  : 'border border-ink-950/15 text-ink-400 dark:border-white/15 dark:text-white/35'
            }`}
          >
            {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
          </span>

          <span
            className={`hidden truncate text-[12px] sm:block ${
              active ? 'text-ink-950 dark:text-white' : 'text-ink-400 dark:text-white/35'
            }`}
          >
            {label}
          </span>

          {index < labels.length - 1 && (
            <span
              aria-hidden="true"
              className={`h-px flex-1 transition-colors duration-500 ${
                done ? 'bg-agro-600' : 'bg-ink-950/10 dark:bg-white/10'
              }`}
            />
          )}
        </li>
      );
    })}
  </ol>
);
