'use client';

import Card from '@/app/ranking/components/videoRankingSection/card';

export default function Section({ currentSort, toggleMusic, selectedMusic, videos }) {
  return (
    <div className="pb-12 space-y-4 ">
      {videos.map((video, index) => (
        <Card
          key={video.video_id}
          video={video}
          index={index}
          currentSort={currentSort}
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
      {Array.from({ length: 10 }).map((_, index) => (
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
