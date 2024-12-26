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

// function AnalyticsEventTracker() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     track('page_view', {
//       path: pathname,
//       query: searchParams.toString(),
//     });
//   }, [pathname, searchParams]);

//   return null;
// }

// export const trackEvent = {
//   playVideo: (videoId: string, title: string) => {
//     track('play_video', {
//       videoId,
//       title,
//       timestamp: new Date().toISOString(),
//     });
//   },

//   createPlaylist: (playlistName: string) => {
//     track('create_playlist', {
//       name: playlistName,
//       timestamp: new Date().toISOString(),
//     });
//   },

//   sortChange: (sortType: string) => {
//     track('sort_change', {
//       type: sortType,
//       timestamp: new Date().toISOString(),
//     });
//   },

//   filterChange: (filterType: string) => {
//     track('filter_change', {
//       type: filterType,
//       timestamp: new Date().toISOString(),
//     });
//   },
// };
