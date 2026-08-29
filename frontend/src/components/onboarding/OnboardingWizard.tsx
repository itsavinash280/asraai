import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getRoleHomePath } from '../common/ProtectedRoute';
import { UserProfile } from '../../types';
import { COMMON_FIELDS, FieldDef, ROLE_STEP } from './schema';
import { FieldErrors, StepIndicator, WizardField, getPath, setPath, validateFields } from './fields';

/**
 * Post-login profile setup.
 *
 * Opens over the app whenever users/{uid}.isProfileComplete is false, walks the
 * account through a common location step and a role-specific step, then writes
 * the whole document to Cloud Firestore in one merge-write.
 *
 * "Skip for now" is always available — the wizard is a nudge, not a wall — and
 * a skip is remembered for the session so it does not reappear on every route.
 */

const SKIP_KEY = 'asraverse_onboarding_skipped';

const wasSkippedThisSession = (uid: string): boolean => {
  try {
    return sessionStorage.getItem(`${SKIP_KEY}_${uid}`) === '1';
  } catch {
    return false;
  }
};

const rememberSkip = (uid: string) => {
  try {
    sessionStorage.setItem(`${SKIP_KEY}_${uid}`, '1');
  } catch {
    /* sessionStorage unavailable */
  }
};

/** Trim strings, drop blanks, and coerce the one numeric field. */
const buildPayload = (draft: Record<string, any>, fields: FieldDef[]): Partial<UserProfile> => {
  const payload: Record<string, any> = {};

  fields.forEach((field) => {
    const raw = getPath(draft, field.key);

    let value: any = raw;
    if (typeof raw === 'string') value = raw.trim();
    if (Array.isArray(raw)) value = raw.map((item) => String(item).trim()).filter(Boolean);
    if (field.kind === 'number') value = Number(raw);

    const blank =
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (field.kind === 'number' && !Number.isFinite(value));

    if (blank) return;

    const [head, ...rest] = field.key.split('.');
    if (rest.length === 0) {
      payload[head] = value;
      return;
    }
    payload[head] = { ...(payload[head] || {}), [rest.join('.')]: value };
  });

  return payload as Partial<UserProfile>;
};

export const OnboardingWizard: React.FC = () => {
  const { user, profile, isProfileLoading, isProfileComplete, saveProfile, skipProfileSetup } =
    useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  const role = user?.role ?? 'FARMER';
  const roleCopy = ROLE_STEP[role];

  /* Steps carrying inputs — ADMIN has no role-specific questions, so its
     wizard is the location step alone. The confirmation is not counted. */
  const formSteps = useMemo<FieldDef[][]>(
    () => (roleCopy.fields.length > 0 ? [COMMON_FIELDS, roleCopy.fields] : [COMMON_FIELDS]),
    [roleCopy],
  );
  const confirmStep = formSteps.length;
  const isConfirmation = step === confirmStep;

  /* The save flips isProfileComplete to true, so the confirmation step has to
     keep the modal open on its own until the user closes it. */
  const open =
    Boolean(user) &&
    !dismissed &&
    (isConfirmation || (!isProfileLoading && profile !== null && !isProfileComplete));

  // Seed the draft from whatever the account already has, so a returning user
  // who skipped earlier does not retype answers.
  useEffect(() => {
    if (!profile) return;
    setDraft({ ...(profile as Record<string, any>) });
    setStep(0);
    setErrors({});
    setSaveError(null);
    setDismissed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.uid]);

  // A skip stays honoured until the next sign-in.
  useEffect(() => {
    if (user && wasSkippedThisSession(user.id)) setDismissed(true);
  }, [user?.id]);

  // Lock the page behind the modal and let Escape act as "skip for now".
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSaving) handleSkip();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isSaving]);

  // Each step starts at the top of the panel rather than mid-scroll.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  if (!open || !user) return null;

  const updateField = (key: string, value: any) => {
    setDraft((prev) => setPath(prev, key, value));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSkip = async () => {
    rememberSkip(user.id);
    setDismissed(true);
    await skipProfileSetup();
  };

  const handleBack = () => {
    setSaveError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleNext = async () => {
    const fields = formSteps[step];
    const found = validateFields(fields, draft);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Bring the first offending field into view and focus it.
      const firstKey = fields.find((f) => found[f.key])?.key;
      if (firstKey) {
        const el = document.getElementById(`onb-${firstKey.replace(/\./g, '-')}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (el as HTMLElement | null)?.focus({ preventScroll: true });
      }
      return;
    }

    setErrors({});

    // Not the last form step yet — just advance.
    if (step < formSteps.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    const payload = buildPayload(draft, formSteps.flat());
    const result = await saveProfile({ ...payload, isProfileComplete: true });

    setIsSaving(false);

    if (!result.success) {
      setSaveError(result.message || 'We could not save your details. Please try again.');
      return;
    }

    setStep(confirmStep);
  };

  const handleFinish = () => {
    setDismissed(true);
    navigate(getRoleHomePath(user.role), { replace: true });
  };

  const stepLabels = formSteps.length > 1 ? ['Location', roleCopy.title] : ['Location'];
  const heading = isConfirmation
    ? 'You are all set'
    : step === 0
      ? 'Where do you work?'
      : roleCopy.title;
  const blurb = isConfirmation
    ? 'Your profile is saved. AsraVerse AI will now tailor crop advice, mandi rates and weather to your district.'
    : step === 0
      ? 'Your district drives the weather forecast, the mandi rates you see, and the schemes you qualify for.'
      : roleCopy.blurb;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/60 p-0 backdrop-blur-md sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-heading"
    >
      <div
        className="grain relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/40 bg-paper-50/85 shadow-2xl backdrop-blur-2xl sm:rounded-3xl dark:border-white/10 dark:bg-ink-900/80"
      >
        {/* Header */}
        <header className="shrink-0 border-b border-ink-950/10 px-6 pb-6 pt-7 sm:px-10 dark:border-white/10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-eyebrow uppercase text-agro-700 dark:text-agro-400">
                {isConfirmation
                  ? 'Welcome to AsraVerse AI'
                  : `Step ${step + 1} of ${formSteps.length}`}
              </p>
              <h2
                id="onboarding-heading"
                className="mt-4 font-display text-display-4 font-semibold text-ink-950 dark:text-white"
              >
                {heading}
              </h2>
            </div>

            <span
              aria-hidden="true"
              className="hidden shrink-0 rounded-full border border-ink-950/10 px-4 py-1.5 text-[11px] text-ink-500 sm:block dark:border-white/15 dark:text-white/45"
            >
              {roleCopy.titleHi}
            </span>
          </div>

          <p className="mt-4 max-w-measure-lg text-[14px] leading-relaxed text-ink-500 dark:text-white/50">
            {blurb}
          </p>

          {!isConfirmation && (
            <div className="mt-7">
              <StepIndicator labels={stepLabels} current={step} />
            </div>
          )}
        </header>

        {/* Body */}
        <div ref={panelRef} className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
          {isConfirmation ? (
            <ConfirmationPanel name={user.name} draft={draft} fields={formSteps.flat()} />
          ) : (
            <FormPanel
              fields={formSteps[step]}
              draft={draft}
              errors={errors}
              onChange={updateField}
            />
          )}

          {saveError && (
            <p
              role="alert"
              className="mt-8 flex items-start gap-2.5 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3.5 text-[13px] text-rose-600 dark:text-rose-300"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {saveError}
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="shrink-0 border-t border-ink-950/10 px-6 py-5 sm:px-10 dark:border-white/10">
          {isConfirmation ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleFinish}
                className="group/btn inline-flex items-center gap-2.5 rounded-full bg-ink-950 px-8 py-3.5 text-[13px] font-medium tracking-wide text-paper-50 transition-colors duration-500 ease-editorial hover:bg-agro-600 dark:bg-white dark:text-ink-950 dark:hover:bg-agro-500"
              >
                Open my dashboard
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 text-[13px] text-ink-500 transition-colors hover:text-ink-950 disabled:opacity-40 dark:text-white/45 dark:hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={isSaving}
                  className="link-underline text-[13px] text-ink-400 transition-colors hover:text-ink-950 disabled:opacity-40 dark:text-white/35 dark:hover:text-white"
                >
                  Skip for now
                </button>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={isSaving}
                className="group/btn inline-flex items-center gap-2.5 rounded-full bg-ink-950 px-8 py-3.5 text-[13px] font-medium tracking-wide text-paper-50 transition-colors duration-500 ease-editorial hover:bg-agro-600 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-ink-950 dark:hover:bg-agro-500"
              >
                {isSaving && (
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                )}
                {isSaving
                  ? 'Saving…'
                  : step < formSteps.length - 1
                    ? 'Continue'
                    : 'Save & continue'}
                {!isSaving && (
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1"
                  />
                )}
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const FormPanel: React.FC<{
  fields: FieldDef[];
  draft: Record<string, any>;
  errors: FieldErrors;
  onChange: (key: string, value: any) => void;
}> = ({ fields, draft, errors, onChange }) => {
  // Fields are grouped by their optional `section` heading, in schema order.
  const groups: { section?: string; fields: FieldDef[] }[] = [];

  fields.forEach((field) => {
    const last = groups[groups.length - 1];
    if (last && last.section === field.section) {
      last.fields.push(field);
      return;
    }
    groups.push({ section: field.section, fields: [field] });
  });

  return (
    <div className="space-y-9">
      {groups.map((group, index) => (
        <fieldset key={group.section || `group-${index}`}>
          {group.section && (
            <legend className="mb-5 text-eyebrow uppercase text-ink-400 dark:text-white/30">
              {group.section}
            </legend>
          )}
          <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
            {group.fields.map((field) => (
              <WizardField
                key={field.key}
                field={field}
                value={getPath(draft, field.key)}
                error={errors[field.key]}
                onChange={(value) => onChange(field.key, value)}
              />
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

const ConfirmationPanel: React.FC<{
  name: string;
  draft: Record<string, any>;
  fields: FieldDef[];
}> = ({ name, draft, fields }) => {
  const rows = fields
    .map((field) => {
      const raw = getPath(draft, field.key);
      if (raw == null || raw === '' || (Array.isArray(raw) && raw.length === 0)) return null;

      const value = Array.isArray(raw)
        ? raw.join(', ')
        : field.options?.find((o) => o.value === String(raw))?.label ?? String(raw);

      return { label: field.label.replace(/ \(optional\)$/, ''), value };
    })
    .filter(Boolean) as { label: string; value: string }[];

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-agro-600 text-white">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="font-display text-xl font-semibold text-ink-950 dark:text-white">
          Welcome aboard, {name.split(' ')[0]}.
        </p>
      </div>

      <dl className="mt-8 divide-y divide-ink-950/10 border-y border-ink-950/10 dark:divide-white/10 dark:border-white/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 py-3.5">
            <dt className="text-[12px] uppercase tracking-wide text-ink-400 dark:text-white/35">
              {row.label}
            </dt>
            <dd className="text-right text-[14px] text-ink-950 dark:text-white">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-[13px] text-ink-500 dark:text-white/45">
        You can change any of this later from your profile.
      </p>
    </div>
  );
};
