'use client';

import Card from '@/app/ranking/components/videoRankingSection/card';
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import { useEffect } from 'react';

export default function Section({ currentTag, toggleMusic, selectedMusic, initialData }) {
  const { data: videos } = useYoutubeVideos({
    sortBy: currentTag,
    initialData,
  });
  useEffect(() => {}, [currentTag]);

  return (
    <div className="pb-12 space-y-4">
      {videos.map((video, index) => (
        <Card
          key={video.id}
          video={video}
          index={index}
          selectedTag={currentTag}
          toggleMusic={toggleMusic}
          selectedMusic={selectedMusic}
        />
      ))}
    </div>
  );
}

Section.Skeleton = function Skeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 p-4 animate-pulse">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="w-12 h-10 bg-gray-200 rounded" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
