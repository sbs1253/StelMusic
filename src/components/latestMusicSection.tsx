'use client';

import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import VideoSlider from '@/app/components/videoSlider';

export function LatestMusicSection({ initialData }) {
  const { data } = useYoutubeVideos({
    sortBy: 'date',
    initialData,
    limit: 10,
  });

  return <VideoSlider videos={data} />;
}
