import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import Ui from '@/app/ranking/ui';
import RankingSkeleton from '@/app/ranking/components/videoRankingSection/rankingSkeleton';
import { SortType } from '@/mocks/types_db';
import { Suspense } from 'react';

export default async function page({ searchParams }) {
  const currentTag = (searchParams.q || 'views') as SortType;
  const initialData = await fetchYoutubePlaylist(currentTag);
  return (
    <Suspense fallback={<RankingSkeleton />}>
      <Ui initialData={initialData} currentTag={currentTag} />
    </Suspense>
  );
}
