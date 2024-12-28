'use client';
import { Analytics } from '@vercel/analytics/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { track } from '@vercel/analytics';
import { useEffect } from 'react';
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics />
      {/* <AnalyticsEventTracker /> */}
      {children}
    </>
  );
}
