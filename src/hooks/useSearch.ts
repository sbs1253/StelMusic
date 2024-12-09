import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { getVideos } from '@/actions/youtube/video.action.ts';

export function useSearch(initialData) {
  const [videos, setVideos] = useState(initialData.videos);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const debouncedQuery = useDebounce(query, 500);

  // 검색 결과 가져오기
  const fetchSearchResults = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const results = await getVideos({
        searchQuery: debouncedQuery,
        playlistType: 'all',
        sortBy: 'views',
        limit: 30,
        offset: (pageNum - 1) * 30,
      });

      if (pageNum === 1) {
        setVideos(results.videos);
      } else {
        setVideos((prev) => [...prev, ...results.videos]);
      }

      setHasMore(results.hasMore);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어가 변경될 때 결과 초기화 및 재검색
  useEffect(() => {
    setPage(1);
    if (debouncedQuery) {
      fetchSearchResults(1);
    }
  }, [debouncedQuery]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSearchResults(nextPage);
    }
  };

  return {
    videos,
    isLoading,
    hasMore,
    loadMore,
  };
}
