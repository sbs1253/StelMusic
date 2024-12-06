import { Suspense } from 'react';
import UI from 'src/app/ui';
import { HomeSkeleton } from './components/homeSkeleton';
import { fetchYoutubeChannels } from '@/actions/youtubeThumbnails.action';
import { fetchYoutubeVideos, getVideos } from '@/actions/fetchYoutubePlaylist.action';
import { Navbar } from '@/components/navBar';

export default async function PlaylistViewer() {
  // await fetchYoutubeVideos();
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
