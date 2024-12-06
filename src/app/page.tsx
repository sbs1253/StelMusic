import { Suspense } from 'react';
import UI from 'src/app/ui';
import { HomeSkeleton } from './components/homeSkeleton';
import { fetchYoutubeChannels } from '@/actions/youtubeThumbnails.action';
import { fetchYoutubeVideos, getVideos } from '@/actions/fetchYoutubePlaylist.action';

export default async function PlaylistViewer() {
  await fetchYoutubeVideos();
  const [latestVideos, topVideo, initialChannel] = await Promise.all([
    getVideos({ sortBy: 'date' }),
    getVideos({ sortBy: 'views', limit: 5 }),
    fetchYoutubeChannels(),
  ]);

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <UI latestVideos={latestVideos.videos} topVideo={topVideo.videos} initialChannel={initialChannel} />
    </Suspense>
  );
}
