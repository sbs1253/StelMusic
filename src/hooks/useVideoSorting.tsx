import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { SortType, YoutubeVideo } from '@/mocks/types_db';
import sortVideos from '@/utils/sortVideos';

interface UseVideoSortingProps {
  initialData: YoutubeVideo[];
}

interface UseVideoSortingReturn {
  videos: YoutubeVideo[];
  currentSort: SortType;
  handleTagSelect: (newSort: SortType) => void;
  isPending: boolean;
}

export function useVideoSorting({ initialData }: UseVideoSortingProps): UseVideoSortingReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = (searchParams.get('q') as SortType) || 'views';

  const videos = useMemo(() => sortVideos(initialData, currentSort), [initialData, currentSort]);

  const handleTagSelect = (newSort: SortType) => {
    startTransition(() => {
      router.push(`/ranking?q=${newSort}`);
    });
  };
  return {
    videos,
    currentSort,
    handleTagSelect,
    isPending,
  };
}
