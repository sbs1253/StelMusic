import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import Ui from '@/app/ranking/ui';

export default async function page() {
  const initialData = await fetchYoutubePlaylist();
  return <Ui initialData={initialData} />;
}
