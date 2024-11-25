import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import Ui from '@/app/ranking/ui';
import { SortType } from '@/mocks/types_db';
import { fetchYoutubeVideos, getVideos } from '@/actions/fetchYoutubePlaylist.action';
export default async function page({ searchParams }) {
  const sortType = (searchParams.q as SortType) || 'views';
  const page = 1;
  const limit = 30;

  const initialData = await fetchYoutubePlaylist();
  const { videos, totalCount, hasMore } = await getVideos({
    sortBy: sortType,
    limit,
    offset: 0,
  });
  return (
    <Ui initialData={initialData} initialSort={sortType} video={videos} totalCount={totalCount} hasMore={hasMore} />
  );
}
