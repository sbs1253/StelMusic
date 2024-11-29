import { useVideoQuery } from '@/hooks/useVideoQuery';
import { useVideoFilters } from '@/hooks/useVideoFilters';

export function useVideoManagement({ initialData, initialFilters }) {
  const { filters, updateFilter } = useVideoFilters(initialFilters);
  const { data } = useVideoQuery({
    ...filters,
    initialData,
  });
  return {
    videos: data.videos,
    filters,
    updateFilter,
  };
}
