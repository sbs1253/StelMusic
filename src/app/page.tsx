import { fetchYoutubePlaylist } from 'src/actions/youtube.action';
import { Suspense } from 'react';

import UI from 'src/app/ui';

export default async function PlaylistViewer() {
  const initialData = await fetchYoutubePlaylist();
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <UI initialData={initialData} />
      </Suspense>
    </>
  );
}
