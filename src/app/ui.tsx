'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { LatestMusicSection } from './components/latestMusicSection';
import { TopRankingSection } from '@/app/components/topRankingSection';
import { ChannelSection } from '@/app/components/channelSection';

export default function UI({ initialData, initialChannel }) {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 최신 음악 섹션 */}
      <section>
        <h1 className="text-xl font-bold text-brand-text mb-4">최신 음악</h1>
        <Suspense fallback={<LatestMusicSection.Skeleton />}>
          <LatestMusicSection videos={initialData} />
        </Suspense>
      </section>

      {/* 인기 순위 섹션 */}
      <section className="rounded-md">
        <Suspense fallback={<TopRankingSection.Skeleton />}>
          <TopRankingSection initialData={initialData} />
        </Suspense>
      </section>

      {/* 채널 섹션 */}
      <section>
        <h1 className="text-xl font-bold mb-4">채널</h1>
        <Suspense fallback={<ChannelSection.Skeleton />}>
          <ChannelSection initialChannel={initialChannel} />
        </Suspense>
      </section>
    </div>
  );
}
