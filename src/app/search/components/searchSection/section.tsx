'use client';

import Card from '@/app/search/components/searchSection/card';
import { useSearch } from '@/hooks/useSearch';
import { Search } from '@mui/icons-material';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Section({ initialData }) {
  const { videos, isLoading, hasMore, loadMore } = useSearch(initialData);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore]);

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-brand-background/50 p-4 mb-4">
          <Search className="w-8 h-8 text-brand-primary" />
        </div>
        <p className="text-brand-text text-center">
          검색 결과가 없습니다.
          <br />
          다른 검색어로 다시 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {videos.map((video) => (
        <Card key={video.video_id} video={video} sort="views" />
      ))}
      {(hasMore || isLoading) && (
        <div ref={loadMoreRef} className="py-6 flex justify-center">
          {isLoading && (
            <div className="flex items-center gap-2 text-brand-primary">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">로딩중...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
