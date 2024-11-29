import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VideoFilters } from '@/mocks/types_db';

export function useVideoFilters(initialFilters: VideoFilters) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getCurrentFilters = useCallback((): VideoFilters => {
    return {
      sort: (searchParams.get('sort') as VideoFilters['sort']) || initialFilters.sort,
      rankType: (searchParams.get('rankType') as VideoFilters['rankType']) || initialFilters.rankType,
      playlistType: (searchParams.get('playlistType') as VideoFilters['playlistType']) || initialFilters.playlistType,
    };
  }, [searchParams, initialFilters]);

  const updateFilter = useCallback(
    (filterType: keyof VideoFilters, newValue: string) => {
      const currentFilters = getCurrentFilters();
      if (currentFilters[filterType] === newValue) return;

      const params = new URLSearchParams(searchParams);
      params.set(filterType, newValue);

      router.replace(`?${params.toString()}`);
    },
    [getCurrentFilters, router, searchParams]
  );

  return {
    filters: getCurrentFilters(),
    updateFilter,
  };
}
