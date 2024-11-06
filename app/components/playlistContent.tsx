'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchYoutubePlaylist } from 'app/actions/youtube.action';
export default function PlaylistContent({ initialData }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['playlist'],
    queryFn: () => fetchYoutubePlaylist(),
    initialData,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) console.log(data);
  return <div></div>;
}
