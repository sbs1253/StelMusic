'use client';
import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import sortVideos from '@/utils/sortVideos';
import { useSuspenseQuery } from '@tanstack/react-query';
import { SortType, YoutubeVideo } from 'src/mocks/types_db';

interface YoutubeVideosProps {
  sortBy: SortType;
  initialData?: YoutubeVideo[];
  limit?: number;
}

export function useYoutubeVideos({ sortBy, initialData, limit }: YoutubeVideosProps) {
  return useSuspenseQuery({
    queryKey: ['youtubeVideos', sortBy],
    queryFn: () => fetchYoutubePlaylist(sortBy),
    initialData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    select: (data) => {
      const sortedData = sortVideos(data, sortBy);
      return limit ? sortedData.slice(0, limit) : sortedData;
    },
  });
}
