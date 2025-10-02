
'use client';

import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { createContext, useContext, useMemo } from 'react';

import { FirebaseApp, getApp } from 'firebase/app';
import { FirebaseClientProvider } from './client-provider';

// Create a context for the Firebase services
interface FirebaseContextValue {
  auth: Auth;
  firestore: Firestore;
  app: FirebaseApp;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

/**
 * Provides Firebase services to its children components.
 * Must be used inside a `FirebaseClientProvider`.
 */
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const app = getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const value = useMemo(
    () => ({ auth, firestore, app }),
    [auth, firestore, app]
  );
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

/**
 * Provides Firebase services to its children components, wrapped with the client provider.
 */
export function FirebaseAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <FirebaseProvider>{children}</FirebaseProvider>
    </FirebaseClientProvider>
  );
}

// Hooks for accessing Firebase services
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useAuth = () => {
  const { auth } = useFirebase();
  return auth;
};

export const useFirestore = () => {
  const { firestore } = useFirebase();
  return firestore;
};
