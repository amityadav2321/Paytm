"use client";

import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "@repo/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
}
