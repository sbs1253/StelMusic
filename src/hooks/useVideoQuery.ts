import { getVideos } from '@/actions/fetchYoutubePlaylist.action';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export function useVideoQuery({ sort, rankType, playlistType, initialData }) {
  return useQuery({
    queryKey: ['videos', { sort, rankType, playlistType }],
    queryFn: () =>
      getVideos({
        sortBy: sort,
        rankType,
        playlistType,
        limit: 30,
        offset: 0,
      }),
    initialData,
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 2, // 2시간
  });
}
