import { PlaylistType, SortBy, RankType, loadMoreVideos } from '@/actions/fetchYoutubePlaylist.action';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps {
  initialData: {
    videos: any[];
    hasMore: boolean;
    totalCount: number;
  };
  filters: {
    playlistType: PlaylistType;
    sortBy: SortBy;
    rankType: RankType;
  };
  searchQuery?: string;
  isSearchMode?: boolean;
}

export function useInfiniteScroll({
  initialData,
  filters,
  searchQuery = '',
  isSearchMode = false,
}: UseInfiniteScrollProps) {
  const [videos, setVideos] = useState(initialData.videos);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !inView) return;

    // 이전 타임아웃이 있다면 클리어
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 디바운스 적용 (500ms)
    timeoutRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        const nextPage = page + 1;

        const response = await loadMoreVideos({
          ...filters,
          page: nextPage,
        });

        if (response.videos.length > 0) {
          setVideos((prev) => [...prev, ...response.videos]);
          setHasMore(response.hasMore);
          setPage(nextPage);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to load more videos:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms 디바운스

    // 컴포넌트 언마운트시 타임아웃 클리어
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [filters, hasMore, isLoading, inView, page]);
  // inView 상태가 변경될 때만 loadMore 호출
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);
  const prevFiltersRef = useRef(filters);

  // 필터 변경 감지
  useEffect(() => {
    const hasChanged =
      prevFiltersRef.current.playlistType !== filters.playlistType ||
      prevFiltersRef.current.sortBy !== filters.sortBy ||
      prevFiltersRef.current.rankType !== filters.rankType;
    if (hasChanged) {
      prevFiltersRef.current = filters;
      setVideos(initialData.videos);
      setHasMore(initialData.hasMore);
      setPage(1);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [filters, initialData]);
  return {
    videos,
    isLoading,
    hasMore,
    loadMoreRef: ref,
    containerRef,
  };
}
