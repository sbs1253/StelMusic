import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import Ui from '@/app/ranking/ui';
import { SortType } from '@/mocks/types_db';

export default async function page({ searchParams }) {
  const sortType = (searchParams.q as SortType) || 'views';
  const initialData = await fetchYoutubePlaylist();
  return <Ui initialData={initialData} initialSort={sortType} />;
}
