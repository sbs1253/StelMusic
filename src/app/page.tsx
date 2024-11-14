import { fetchYoutubePlaylist } from 'src/actions/youtube.action';
import { fetchYoutubeChannels } from '@/actions/youtubeThumbnails.action';
import { Suspense } from 'react';
import UI from 'src/app/ui';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function PlaylistViewer() {
  const initialData = await fetchYoutubePlaylist('likes');
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      {/* <Header /> */}
      <UI initialData={initialData} />
    </Suspense>
  );
}
