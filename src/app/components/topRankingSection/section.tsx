'use client';

import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import Card from '@/app/components/topRankingSection/card';

export default function Section({ initialData }) {
  const { data } = useYoutubeVideos({
    sortBy: 'views',
    // initialData,
    limit: 5,
  });

  return (
    <div className="rounded-2xl bg-brand-background/50 backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">인기 TOP 5</h2>
        <button className="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors">전체보기</button>
      </div>
      <div className="space-y-3">
        {data.map((video, index) => (
          <Card key={video.id} video={video} index={index} />
        ))}
      </div>
    </div>
  );
}
