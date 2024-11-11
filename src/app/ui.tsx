'use client';

import React, { Suspense } from 'react';
import ChannelList from './../components/channelList';
import { useQuery } from '@tanstack/react-query';
import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import VideoSlider from '@/components/videoSlider';
import VideoTopRankingCard from '@/components/videoTopRankingCard';
import Link from 'next/link';

export default function UI({ initialData }) {
  const { data, error } = useQuery({
    queryKey: ['playlist'],
    queryFn: () => fetchYoutubePlaylist(),
    initialData,
    staleTime: 1000 * 60 * 5,
  });
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Suspense fallback={<div>loading...</div>}>
      <section className="max-w-[1200px] m-2">
        <div>
          <h1 className="text-xl font-bold text-brand-text">최신 음악</h1>
          <div className={`container mx-auto`}>
            <VideoSlider videos={data} />
          </div>
        </div>
        <div className="p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">인기 순위</h1>
            <Link href="/ranking">전체보기</Link>
          </div>
          <div>
            {data.slice(0, 5).map((video, index) => (
              <VideoTopRankingCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold">채널</h1>
          <ChannelList />
        </div>
      </section>
    </Suspense>
  );
}
