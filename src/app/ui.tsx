'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { LatestMusicSection } from '@/components/latestMusicSection';
import { VideoSliderSkeleton } from '@/components/skeleton/videoSliderSkeleton';
import { TopRankingSkeleton } from '@/components/skeleton/topRankingSkeleton';
import { TopRankingSection } from '@/components/topRankingSection';
import ChannelSection from '../components/channelSection';
import { ChannelListSkeleton } from '@/components/skeleton/channelListSkeleton';

export default function UI({ initialData }) {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 최신 음악 섹션 */}
      <section>
        <h1 className="text-xl font-bold text-brand-text mb-4">최신 음악</h1>
        <Suspense fallback={<VideoSliderSkeleton />}>
          <LatestMusicSection initialData={initialData} />
        </Suspense>
      </section>

      {/* 인기 순위 섹션 */}
      <section className="rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">인기 순위</h1>
          <Link href="/ranking" className="text-sm text-gray-600 hover:text-gray-900">
            전체보기
          </Link>
        </div>
        <Suspense fallback={<TopRankingSkeleton />}>
          <TopRankingSection initialData={initialData} />
        </Suspense>
      </section>

      {/* 채널 섹션 */}
      <section>
        <h1 className="text-xl font-bold mb-4">채널</h1>
        <Suspense fallback={<ChannelListSkeleton />}>
          <ChannelSection />
        </Suspense>
      </section>
    </div>
  );
}
