
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '../provider';
import { User } from 'firebase/auth';

export function AdminAuthGuard({
  children,
  publicRoutes = [],
}: {
  children: React.ReactNode;
  publicRoutes?: string[];
}) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user ?? null);
    });
  }, [auth]);

  const isPublic = publicRoutes.includes(pathname);

  useEffect(() => {
    // If the auth state is still loading, do nothing.
    if (user === undefined) {
      return;
    }

    // If the user is not logged in and the route is not public, redirect to login.
    if (!user && !isPublic) {
      router.replace('/login');
      return;
    }

    // If the user is logged in and tries to access a public-only route (like login), redirect to admin.
    if (user && isPublic) {
      router.replace('/admin');
      return;
    }
  }, [user, isPublic, pathname, router]);

  // If the user is authenticated or the route is public, render the children.
  // Otherwise, render a loading state or null while redirecting.
  if ((user && !isPublic) || (!user && isPublic)) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
    </div>
  );
}
