'use client';
import { fetchYoutubeChannels } from '@/actions/youtubeThumbnails.action';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useChannelQuery(initialData) {
  return useSuspenseQuery({
    queryKey: ['YoutubeChannels'],
    queryFn: () => fetchYoutubeChannels(),
    initialData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
