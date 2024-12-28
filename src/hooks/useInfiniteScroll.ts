import { loadMoreVideos } from '@/actions/youtube/video.action.ts';
import { PlaylistType, RankType, SortBy } from '@/types/youtube';
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
  console.log(initialData);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevFiltersRef = useRef(filters);

  const resetScroll = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);
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
      setIsLoading(false);

      // 필터 변경 시 스크롤 초기화 및 loadMore 방지를 위한 타임아웃 설정
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      resetScroll();

      // 스크롤 애니메이션이 완료될 때까지 loadMore 비활성화
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 1000);
    }
  }, [filters, initialData, resetScroll]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !inView || timeoutRef.current) return;

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

  return {
    videos,
    isLoading,
    hasMore,
    loadMoreRef: ref,
    containerRef,
  };
}
