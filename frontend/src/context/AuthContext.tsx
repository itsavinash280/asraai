import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { User, UserRole } from '../types';

export interface RoleInfo {
  role: UserRole;
  title: string;
  titleHi: string;
  badge: string;
  description: string;
  icon: string;
}

export const AVAILABLE_ROLES: RoleInfo[] = [
  {
    role: 'FARMER',
    title: 'Farmer',
    titleHi: 'किसान',
    badge: 'Crop AI & Mandi',
    description: 'AI Crop Recommendation, Plant Disease Scan, Fasal Marketplace & Weather Forecasts',
    icon: '🌾',
  },
  {
    role: 'BUYER',
    title: 'Wholesale Buyer',
    titleHi: 'थोक खरीदार',
    badge: 'Direct Procurement',
    description: 'Direct Mandi Farmer Procurement, Bulk Escrow Orders & Quality Certified Produce',
    icon: '🛒',
  },
  {
    role: 'EXPERT',
    title: 'KVK Agri Expert',
    titleHi: 'कृषि विशेषज्ञ',
    badge: 'ICAR / KVK Certified',
    description: 'Provide Farmer Disease Diagnostic Consultations & Issue Scientific Prescriptions',
    icon: '🔬',
  },
  {
    role: 'TRANSPORT',
    title: 'Logistics Partner',
    titleHi: 'माल ढुलाई',
    badge: 'Fleet & Dispatch',
    description: 'Farm-to-Mandi Logistics Coordination, Truck Scheduling & Route Fleet Tracking',
    icon: '🚚',
  },
  {
    role: 'ADMIN',
    title: 'Platform Administrator',
    titleHi: 'प्रशासक',
    badge: 'Governance & Analytics',
    description: 'System Oversight, Compliance, Master Data & Platform Intelligence Monitoring',
    icon: '🛡️',
  },
];

export interface AuthResponse {
  success: boolean;
  message?: string;
  role?: UserRole;
  user?: User;
  needsVerification?: boolean;
  verificationEmail?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<AuthResponse>;
  register: (data: { name: string; email: string; phone?: string; password?: string; role: UserRole }) => Promise<AuthResponse>;
  loginWithGoogle: (role?: UserRole, customUser?: { name: string; email: string; avatar?: string }) => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*  Error message mapping                                                     */
/* -------------------------------------------------------------------------- */

const INCORRECT_CREDENTIALS = 'Email or password is incorrect';
const USER_ALREADY_EXISTS = 'User already exists. Please sign in';

const signInErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again in a few minutes.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    // auth/invalid-credential, auth/wrong-password, auth/user-not-found,
    // auth/invalid-email and anything else all read as bad credentials.
    default:
      return INCORRECT_CREDENTIALS;
  }
};

const signUpErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return USER_ALREADY_EXISTS;
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-up is not enabled for this Firebase project.';
    default:
      return 'Could not create your account. Please try again.';
  }
};

const googleErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Google sign-in was cancelled.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Please allow pop-ups for this site and try again.';
    case 'auth/unauthorized-domain':
      return `${window.location.hostname} is not an authorised domain for Google sign-in. Add it under Firebase Console -> Authentication -> Settings -> Authorized domains.`;
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled for this Firebase project.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email. Please sign in with your email and password instead.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return 'Google sign-in could not be completed.';
  }
};

/* -------------------------------------------------------------------------- */
/*  Role handling                                                             */
/*                                                                            */
/*  Firebase Authentication holds no application profile data, and we are not  */
/*  persisting profiles yet. The role chosen at sign-up is remembered locally  */
/*  per Firebase UID so the existing dashboard router keeps working.           */
/* -------------------------------------------------------------------------- */

const roleKey = (uid: string) => `asraverse_role_${uid}`;

const readRole = (uid: string): UserRole => {
  try {
    const stored = localStorage.getItem(roleKey(uid)) as UserRole | null;
    if (stored && AVAILABLE_ROLES.some((r) => r.role === stored)) return stored;
  } catch {
    /* localStorage unavailable */
  }
  return 'FARMER';
};

const writeRole = (uid: string, role: UserRole) => {
  try {
    localStorage.setItem(roleKey(uid), role);
  } catch {
    /* localStorage unavailable */
  }
};

const readStoredRole = (uid: string): string | null => {
  try {
    return localStorage.getItem(roleKey(uid));
  } catch {
    return null;
  }
};

/* The redirect fallback reloads the page, so the chosen role has to survive it. */
const PENDING_ROLE_KEY = 'asraverse_pending_google_role';

const rememberPendingRole = (role: UserRole) => {
  try {
    sessionStorage.setItem(PENDING_ROLE_KEY, role);
  } catch {
    /* sessionStorage unavailable */
  }
};

const takePendingRole = (): UserRole => {
  try {
    const stored = sessionStorage.getItem(PENDING_ROLE_KEY) as UserRole | null;
    sessionStorage.removeItem(PENDING_ROLE_KEY);
    if (stored && AVAILABLE_ROLES.some((r) => r.role === stored)) return stored;
  } catch {
    /* sessionStorage unavailable */
  }
  return 'FARMER';
};

/** Build the app-level User from the Firebase auth record only. */
const toAppUser = (fbUser: FirebaseUser, role?: UserRole): User => {
  const email = fbUser.email || '';
  const fallbackName = email.split('@')[0] || 'AsraVerse User';

  return {
    id: fbUser.uid,
    name: fbUser.displayName || fallbackName,
    email,
    phone: fbUser.phoneNumber || '',
    role: role || readRole(fbUser.uid),
    isVerified: fbUser.emailVerified,
    avatar: fbUser.photoURL || undefined,
  };
};

/* -------------------------------------------------------------------------- */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Firebase restores the session itself; this listener is the single source of truth.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('asraverse_token');
        localStorage.removeItem('asraverse_user');
        setIsLoading(false);
        return;
      }

      const appUser = toAppUser(fbUser);
      setUser(appUser);
      localStorage.setItem('asraverse_user', JSON.stringify(appUser));

      try {
        const idToken = await fbUser.getIdToken();
        setToken(idToken);
        localStorage.setItem('asraverse_token', idToken);
      } catch (err) {
        console.warn('[Firebase Auth] Could not retrieve ID token:', err);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Completes the redirect fallback used when a popup could not be opened.
  useEffect(() => {
    getRedirectResult(auth)
      .then((cred) => {
        if (cred?.user) finishGoogleSignIn(cred.user, takePendingRole());
      })
      .catch((err) => {
        console.warn('[Firebase Auth] Google redirect sign-in failed:', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1. Email & Password Sign In
  const login = async (email: string, password?: string): Promise<AuthResponse> => {
    if (!password) {
      return { success: false, message: INCORRECT_CREDENTIALS };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      // Check if email is verified; if not, sign them out and require verification
      if (!cred.user.emailVerified) {
        await signOut(auth);
        return {
          success: false,
          needsVerification: true,
          verificationEmail: cred.user.email || email,
          message: `We have sent you a verification email to ${cred.user.email || email}. Please verify it and log in.`,
        };
      }

      const appUser = toAppUser(cred.user);
      return { success: true, role: appUser.role, user: appUser };
    } catch (e: any) {
      return { success: false, message: signInErrorMessage(e?.code || '') };
    }
  };

  // 2. Email & Password Sign Up
  const register = async (data: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    role: UserRole;
  }): Promise<AuthResponse> => {
    if (!data.password) {
      return { success: false, message: 'Please choose a password to create your account.' };
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);

      // Remember the selected role locally — no profile data is written anywhere.
      writeRole(cred.user.uid, data.role);

      // Send verification email
      try {
        await sendEmailVerification(cred.user);
      } catch (err) {
        console.warn('[Firebase Auth] Could not send verification email:', err);
      }

      // Sign out immediately — don't auto-sign in
      await signOut(auth);

      return {
        success: false,
        needsVerification: true,
        verificationEmail: cred.user.email || data.email,
        message: `We have sent you a verification email to ${cred.user.email || data.email}. Please verify it and log in.`,
      };
    } catch (e: any) {
      return { success: false, message: signUpErrorMessage(e?.code || '') };
    }
  };

  // 3. Google Sign In (Firebase Authentication provider - still no profile storage)

  /**
   * Shared tail for both the popup and the redirect flow.
   *
   * onAuthStateChanged has already fired by this point, and it resolved the role
   * from localStorage *before* a first-time Google user had one - so it defaulted
   * to FARMER. Persist the requested role, then refresh the context user, or the
   * app would route a new BUYER/EXPERT/TRANSPORT straight into "Access Restricted".
   */
  const finishGoogleSignIn = (fbUser: FirebaseUser, role: UserRole): AuthResponse => {
    if (!readStoredRole(fbUser.uid)) writeRole(fbUser.uid, role);

    const appUser = toAppUser(fbUser);
    setUser(appUser);
    try {
      localStorage.setItem('asraverse_user', JSON.stringify(appUser));
    } catch {
      /* localStorage unavailable */
    }

    return { success: true, role: appUser.role, user: appUser };
  };

  const loginWithGoogle = async (role: UserRole = 'FARMER'): Promise<AuthResponse> => {
    const provider = new GoogleAuthProvider();
    // Always offer the account chooser rather than silently reusing a session.
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const cred = await signInWithPopup(auth, provider);
      return finishGoogleSignIn(cred.user, role);
    } catch (e: any) {
      const code = e?.code || '';

      // Popups are blocked outright in some browsers and in embedded webviews.
      // Fall back to a full-page redirect, picked up by getRedirectResult below.
      if (
        code === 'auth/popup-blocked' ||
        code === 'auth/operation-not-supported-in-this-environment'
      ) {
        try {
          rememberPendingRole(role);
          await signInWithRedirect(auth, provider);
          return { success: false, message: 'Redirecting to Google sign-in...' };
        } catch (redirectErr: any) {
          return { success: false, message: googleErrorMessage(redirectErr?.code || '') };
        }
      }

      return { success: false, message: googleErrorMessage(code) };
    }
  };

  // 4. Password reset (Firebase Authentication - no database involved)
  const resetPassword = async (email: string): Promise<AuthResponse> => {
    const trimmed = email.trim();
    if (!trimmed) {
      return { success: false, message: 'Enter your email address first.' };
    }

    try {
      await sendPasswordResetEmail(auth, trimmed);
    } catch (e: any) {
      const code = e?.code || '';
      if (code === 'auth/invalid-email') {
        return { success: false, message: 'Please enter a valid email address.' };
      }
      if (code === 'auth/too-many-requests') {
        return { success: false, message: 'Too many requests. Please try again shortly.' };
      }
      // Anything else (including user-not-found) falls through to the generic
      // confirmation below so the form cannot be used to enumerate accounts.
    }

    return {
      success: true,
      message: `If an account exists for ${trimmed}, a reset link is on its way.`,
    };
  };

  // 5. Sign Out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('[Firebase Auth] Sign-out error:', err);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('asraverse_token');
    localStorage.removeItem('asraverse_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        loginWithGoogle,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
