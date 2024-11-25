import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { SortType, YoutubeVideo } from '@/mocks/types_db';
import sortVideos from '@/utils/sortVideos';

interface UseVideoSortingProps {
  initialData: YoutubeVideo[];
  initialSort: SortType;
}

interface UseVideoSortingReturn {
  // videos: YoutubeVideo[];
  currentSort: SortType;
  handleTagSelect: (newSort: SortType) => void;
}

export function useVideoSorting({ initialData, initialSort }: UseVideoSortingProps): UseVideoSortingReturn {
  const router = useRouter();
  const [currentSort, setCurrentSort] = useState<SortType>(initialSort);
  // const videos = useMemo(() => sortVideos(initialData, currentSort), [initialData, currentSort]);

  const handleTagSelect = useCallback(
    (newSort: SortType) => {
      if (currentSort === newSort) return;
      setCurrentSort(newSort);
      router.push(`/ranking?q=${newSort}`, {
        scroll: false,
      });
    },
    [currentSort, router]
  );
  return {
    // videos,
    currentSort,
    handleTagSelect,
  };
}
