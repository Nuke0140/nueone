'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';

/**
 * AuthInitializer — Ensures auth state is hydrated on app boot.
 *
 * When NEXT_PUBLIC_AUTH_DISABLED=true:
 *   - Auto-authenticates with mock user (admin@nueone.io)
 *   - Sets the access token in both localStorage AND cookie
 *   - This ensures the middleware doesn't redirect to /login
 *
 * In normal mode:
 *   - Checks for existing token and fetches user profile
 *
 * TODO: Re-enable proper auth initialization when backend auth is re-implemented.
 */
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
