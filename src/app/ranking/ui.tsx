'use client';

import TagList from '@/app/ranking/tagList';
import VideoTopRankingCard from '@/components/videoTopRankingCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

export default function Ui({ videoData }) {
  const tagList = ['조회순', '좋아요순', '날짜순'];

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <TagList tagList={tagList}></TagList>
      <div>
        {videoData.map((video, index) => (
          <VideoTopRankingCard key={video.id} video={video} index={index} />
        ))}
      </div>
    </Suspense>
  );
}
