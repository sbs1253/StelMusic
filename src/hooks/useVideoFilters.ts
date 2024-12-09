import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VideoFilters } from '@/types/youtube';

export function useVideoFilters(initialFilters: VideoFilters) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(
    (): VideoFilters => ({
      sort: (searchParams.get('sort') as VideoFilters['sort']) || initialFilters.sort,
      rankType: (searchParams.get('rankType') as VideoFilters['rankType']) || initialFilters.rankType,
      playlistType: (searchParams.get('playlistType') as VideoFilters['playlistType']) || initialFilters.playlistType,
    }),
    [searchParams, initialFilters]
  );

  const updateFilter = useCallback(
    (filterType: keyof VideoFilters, newValue: string) => {
      if (filters[filterType] === newValue) return;

      const params = new URLSearchParams(searchParams);
      params.set(filterType, newValue);
      router.replace(`?${params.toString()}`);
    },
    [filters, router, searchParams]
  );

  return {
    filters,
    updateFilter,
  };
}
