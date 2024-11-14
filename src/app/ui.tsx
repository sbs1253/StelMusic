'use client';

import React, { Suspense } from 'react';
import ChannelList from './../components/channelList';
import { useQuery } from '@tanstack/react-query';
import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import VideoSlider from '@/components/videoSlider';
import VideoTopRankingCard from '@/components/videoTopRankingCard';
import Link from 'next/link';
import Footer from '@/components/footer';

export default function UI({ initialData }) {
  const { data, error } = useQuery({
    queryKey: ['playlist'],
    queryFn: () => fetchYoutubePlaylist(),
    initialData,
    staleTime: 1000 * 60 * 5,
  });
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 최신 음악 섹션 */}
      <section>
        <h1 className="text-xl font-bold text-brand-text mb-4">최신 음악</h1>
        <VideoSlider videos={data} />
      </section>

      {/* 인기 순위 섹션 */}
      <section className="rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">인기 순위</h1>
          <Link href="/ranking" className="text-sm text-gray-600 hover:text-gray-900">
            전체보기
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {data.slice(0, 5).map((video, index) => (
            <VideoTopRankingCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </section>

      {/* 채널 섹션 */}
      <section>
        <h1 className="text-xl font-bold mb-4">채널</h1>
        <ChannelList />
      </section>
    </div>
  );
}
