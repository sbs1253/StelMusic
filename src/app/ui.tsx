'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { LatestMusicSection } from './components/latestMusicSection';
import { TopRankingSection } from '@/app/components/topRankingSection';
import { ChannelSection } from '@/app/components/channelSection';

export default function UI({ latestVideos, topVideo, initialChannel }) {
  console.log(latestVideos);
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 최신 음악 섹션 */}
      <section>
        <Suspense fallback={<LatestMusicSection.Skeleton />}>
          <LatestMusicSection videos={latestVideos} />
        </Suspense>
      </section>

      {/* 인기 순위 섹션 */}
      <section className="rounded-md">
        <Suspense fallback={<TopRankingSection.Skeleton />}>
          <TopRankingSection topVideo={topVideo} />
        </Suspense>
      </section>

      {/* 채널 섹션 */}
      <section>
        <Suspense fallback={<ChannelSection.Skeleton />}>
          <ChannelSection initialChannel={initialChannel} />
        </Suspense>
      </section>
    </div>
  );
}
