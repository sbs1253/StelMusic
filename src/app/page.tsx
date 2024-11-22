import { fetchYoutubePlaylist } from 'src/actions/youtube.action';
import { Suspense } from 'react';
import UI from 'src/app/ui';
import { HomeSkeleton } from './components/homeSkeleton';
import { fetchYoutubeChannels } from '@/actions/youtubeThumbnails.action';

export default async function PlaylistViewer() {
  const [initialData, initialChannel] = await Promise.all([fetchYoutubePlaylist('likes'), fetchYoutubeChannels()]);

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <UI initialData={initialData} initialChannel={initialChannel} />
    </Suspense>
  );
}
