'use client';

import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import VideoTopRankingCard from '@/components/VideoTopRankingCard';

export function TopRankingSection({ initialData }) {
  const { data } = useYoutubeVideos({
    sortBy: 'views',
    initialData,
    limit: 5,
  });

  return (
    <div className="flex flex-col gap-2">
      {data.map((video, index) => (
        <VideoTopRankingCard key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}
