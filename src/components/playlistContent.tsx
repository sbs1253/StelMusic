'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import MainPopularityranking from './mainPopularityranking';
import { Suspense } from 'react';

export default function PlaylistContent({ initialData }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['playlist'],
    queryFn: () => fetchYoutubePlaylist(),
    initialData,
    staleTime: 1000 * 60 * 5,
  });
  console.log(data);
  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Suspense fallback={<div>loading...</div>}>
      <MainPopularityranking data={data} />
    </Suspense>
  );
}
