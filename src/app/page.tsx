import { fetchYoutubePlaylist } from 'src/actions/youtube.action';
import { Suspense } from 'react';
import UI from 'src/app/ui';
import { HomeSkeleton } from '../components/skeleton/homeSkeleton';

export default async function PlaylistViewer() {
  const initialData = await fetchYoutubePlaylist('likes');
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <UI initialData={initialData} />
    </Suspense>
  );
}
