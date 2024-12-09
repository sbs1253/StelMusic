'use client';

import Card from '@/app/ranking/components/videoRankingSection/card';
export default function Section({ videos, filters, toggleMusic, selectedMusic }) {
  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <Card
          key={video.video_id}
          video={video}
          index={index}
          filters={filters}
          toggleMusic={toggleMusic}
          selectedMusic={selectedMusic}
        />
      ))}
    </div>
  );
}
