import Ui from '@/app/ranking/ui';
import { fetchYoutubeVideos, getVideos } from '@/actions/fetchYoutubePlaylist.action';
import { FILTER_OPTIONS, VideoFilters } from '@/mocks/types_db';
import { Suspense } from 'react';
import RankingSkeleton from '@/app/ranking/components/videoRankingSection/rankingSkeleton';
export default async function page({ searchParams }) {
  const initialFilters: VideoFilters = {
    sort: (searchParams.sort as VideoFilters['sort']) || FILTER_OPTIONS.SORT.VIEWS,
    rankType: (searchParams.rankType as VideoFilters['rankType']) || FILTER_OPTIONS.RANK_TYPE.TOTAL,
    playlistType: (searchParams.playlistType as VideoFilters['playlistType']) || FILTER_OPTIONS.PLAYLIST_TYPE.ALL,
  };
  // await fetchYoutubeVideos();
  const initialData = await getVideos({
    sortBy: initialFilters.sort,
    rankType: initialFilters.rankType,
    playlistType: initialFilters.playlistType,
    limit: 30,
    offset: 0,
  });

  return (
    <Suspense fallback={<RankingSkeleton />}>
      <Ui initialData={initialData} initialFilters={initialFilters} />
    </Suspense>
  );
}
