import { useVideoQuery } from '@/hooks/useVideoQuery';
import { useVideoFilters } from '@/hooks/useVideoFilters';

export function useVideoManagement({ initialData, initialFilters }) {
  const { filters, updateFilter } = useVideoFilters(initialFilters);
  return {
    videos: initialData,
    filters,
    updateFilter,
  };
}
