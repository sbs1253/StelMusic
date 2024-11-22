'use client';
import { fetchYoutubeChannels } from '@/actions/youtubeThumbnails.action';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useChannelQuery({ initialData }) {
  return useSuspenseQuery({
    queryKey: ['YoutubeChannels'],
    queryFn: () => fetchYoutubeChannels(),
    initialData,
    // 하루 한번 갱신
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
