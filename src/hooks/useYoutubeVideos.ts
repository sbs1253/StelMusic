'use client';
import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import { useQuery } from '@tanstack/react-query';
import { SortType, YoutubeVideo } from 'src/mocks/types_db';

export function useYoutubeVideos(sortBy: SortType, initialData?: YoutubeVideo[]) {
  const { data: videos, ...rest } = useQuery({
    queryKey: ['youtubeVideos', sortBy],
    queryFn: () => fetchYoutubePlaylist(sortBy),
    initialData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    videos,
    ...rest,
  };
}
