/**
 * Cloud Firestore data layer for the users/{uid} profile document.
 *
 * Firebase Authentication holds no application profile data, so everything the
 * onboarding wizard collects lives here. The document is created lazily — the
 * first read for a brand-new account returns a stub with isProfileComplete
 * false, which is what makes the wizard open.
 */
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User, UserProfile } from '../types';

export const userDocRef = (uid: string) => doc(db, 'users', uid);

/** Firestore rejects undefined values, so drop those keys entirely. */
const stripUndefined = <T extends Record<string, any>>(value: T): T => {
  const out: Record<string, any> = {};

  Object.entries(value).forEach(([key, val]) => {
    if (val === undefined) return;
    if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
      out[key] = stripUndefined(val);
      return;
    }
    out[key] = val;
  });

  return out as T;
};

/**
 * Read users/{uid}. Returns an unsaved stub (never null) when the document does
 * not exist yet, so callers always have a profile shape to work with.
 */
export const fetchUserProfile = async (user: User): Promise<UserProfile> => {
  const stub: UserProfile = {
    uid: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isProfileComplete: false,
  };

  try {
    const snap = await getDoc(userDocRef(user.id));
    if (!snap.exists()) return stub;

    const data = snap.data() as Partial<UserProfile>;
    return {
      ...stub,
      ...data,
      uid: user.id,
      isProfileComplete: data.isProfileComplete === true,
    };
  } catch (err) {
    console.warn('[Firestore] Could not read users/%s:', user.id, err);
    // Fail open: a read error must not trap the user behind the wizard.
    return { ...stub, isProfileComplete: true };
  }
};

/**
 * Merge-write the profile. `patch` carries whatever the wizard collected; the
 * identity fields are always refreshed from the auth record so the document
 * stays in step with Firebase Authentication.
 */
export const saveUserProfile = async (
  user: User,
  patch: Partial<UserProfile>,
): Promise<UserProfile> => {
  const payload = stripUndefined({
    ...patch,
    uid: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    updatedAt: new Date().toISOString(),
  });

  await setDoc(userDocRef(user.id), payload, { merge: true });

  return { isProfileComplete: false, ...payload } as UserProfile;
};

/** "Skip for now" — remembered so the wizard can nudge again on a later session. */
export const skipUserOnboarding = (user: User) =>
  saveUserProfile(user, {
    isProfileComplete: false,
    onboardingSkippedAt: new Date().toISOString(),
  });
