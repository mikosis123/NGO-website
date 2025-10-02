
'use client';

import {
  User,
  onIdTokenChanged,
} from 'firebase/auth';
import {
  useState,
  useEffect,
} from 'react';

import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
}
