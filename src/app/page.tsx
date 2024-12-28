import { Suspense } from 'react';
import UI from 'src/app/ui';
import { HomeSkeleton } from './components/homeSkeleton';
import { fetchYoutubeChannels } from '@/actions/youtube/youtubeThumbnails.action';
import { Navbar } from '@/components/common/navBar';
import { getVideos } from '@/actions/youtube/video.action.ts';

export default async function PlaylistViewer() {
  const [latestVideos, topVideo, initialChannel] = await Promise.all([
    getVideos({ sortBy: 'date' }),
    getVideos({ sortBy: 'views', limit: 5 }),
    fetchYoutubeChannels(),
  ]);

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Navbar />

      <UI latestVideos={latestVideos.videos} topVideo={topVideo.videos} initialChannel={initialChannel} />
    </Suspense>
  );
}
