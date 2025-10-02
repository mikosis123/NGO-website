
'use client';

import { initializeApp } from 'firebase/app';
import { ReactNode, useMemo } from 'react';

import { firebaseConfig } from './config';

// Initialize Firebase
let app: ReturnType<typeof initializeApp> | undefined = undefined;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.error('Failed to initialize Firebase', e);
}

/**
 * Provides a Firebase client-side provider.
 * This component ensures that Firebase is initialized only once.
 */
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => app, []);

  if (!value) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-red-500">
          Firebase is not configured. Please check your .env files.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
