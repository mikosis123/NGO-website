
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '../provider';
import { User } from 'firebase/auth';

export function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ?? null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const isPublic = pathname === '/login';

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user && !isPublic) {
      router.replace('/login');
    }

    if (user && isPublic) {
      router.replace('/admin');
    }
  }, [user, isPublic, pathname, router, loading]);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  if ((user && !isPublic) || (!user && isPublic)) {
    return <>{children}</>;
  }

  return null;
}
