import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import Ui from '@/app/ranking/ui';
import { Suspense } from 'react';

export default async function page({ searchParams }) {
  const { q } = searchParams;
  console.log(q);
  const videoData = await fetchYoutubePlaylist(q || '');
  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Ui videoData={videoData} />
    </Suspense>
  );
}
