"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  // The auth store persists `user`/`isAuthenticated` to localStorage so the
  // header etc. can render instantly without a flash of "logged out". But
  // that cached copy can go stale (session expired, cookies cleared, logged
  // out elsewhere) while localStorage still says "logged in". Re-validate
  // against the real server session on every app load so the UI — and any
  // page that relies on the store's `user` — reflects reality instead of a
  // stale cache. Only runs if we *think* we're logged in, to avoid an
  // unnecessary request for anonymous visitors.
  useEffect(() => {
    const { isAuthenticated, fetchCurrentUser } = useAuthStore.getState();
    if (isAuthenticated) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
