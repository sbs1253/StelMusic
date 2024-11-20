'use client';

import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import VideoSlider from '@/components/VideoSlider';

export function LatestMusicSection({ initialData }) {
  const { data } = useYoutubeVideos({
    sortBy: 'date',
    initialData,
    limit: 10,
  });

  return <VideoSlider videos={data} />;
}
