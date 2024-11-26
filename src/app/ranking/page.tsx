import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import Ui from '@/app/ranking/ui';
import { SortType } from '@/mocks/types_db';
import { fetchYoutubeVideos, getVideos } from '@/actions/fetchYoutubePlaylist.action';
import { checkDailyStats, fixDailyStatsDate, moveCurrentDataToDailyStats } from '@/actions/moveCurrentDataToDailyStats';
export default async function page({ searchParams }) {
  const sortType = (searchParams.q as SortType) || 'views';
  const page = 1;
  const limit = 30;

  // const initialData = await fetchYoutubeVideos();
  const { videos, totalCount, hasMore } = await getVideos({
    sortBy: sortType,
    limit,
    offset: 0,
  });
  // await fixDailyStatsDate();
  // await moveCurrentDataToDailyStats();
  // console.log(checkDailyStats());
  const { videos: dailyRankings } = await getVideos({
    sortBy: 'views',
    rankType: 'daily',
  });
  console.log(dailyRankings);
  return <Ui initialVideos={videos} initialSort={sortType} totalCount={totalCount} hasMore={hasMore} />;
}
