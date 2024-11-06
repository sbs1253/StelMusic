import { Suspense } from 'react';
import PlaylistContent from './components/PlaylistContent';
import { fetchYoutubePlaylist } from './actions/youtube.action';

export default async function PlaylistViewer() {
  const initialData = await fetchYoutubePlaylist();
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <PlaylistContent initialData={initialData} />
      </Suspense>
    </>
  );
}
