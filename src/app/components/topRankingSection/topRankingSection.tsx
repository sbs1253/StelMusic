'use client';

import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import TopRankingCard from '@/app/components/topRankingSection/topRankingCard';

export default function TopRankingSection({ initialData }) {
  const { data } = useYoutubeVideos({
    sortBy: 'views',
    initialData,
    limit: 5,
  });

  return (
    <div className="flex flex-col gap-2">
      {data.map((video, index) => (
        <TopRankingCard key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}
