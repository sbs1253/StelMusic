'use client';

import { useCallback, useState } from 'react';
import { Header } from '@/app/ranking/components/header';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import { useVideoFilters } from '@/hooks/useVideoFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import PlaybackControl from '@/app/ranking/components/playControl';

export default function Ui({ initialData, initialFilters }) {
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(() => new Set());
  const { filters, updateFilter } = useVideoFilters(initialFilters);
  const MAX_SELECTION = 50;
  const { videos, isLoading, hasMore, loadMoreRef, containerRef } = useInfiniteScroll({
    initialData,
    filters: {
      playlistType: filters.playlistType,
      sortBy: filters.sort,
      rankType: filters.rankType,
    },
  });
  const toggleMusic = useCallback((musicId: string) => {
    setSelectedMusic((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(musicId)) {
        newSelected.delete(musicId);
      } else {
        newSelected.add(musicId);
      }
      return newSelected;
    });
  }, []);

  return (
    <div ref={containerRef} className="relative container mx-auto h-screen overflow-y-auto pt-[166px] pb-16">
      <Header title="인기 순위" filters={filters} updateFilter={updateFilter} />
      <div className="px-4 text-sm text-brand-text">
        {selectedMusic.size > 0 && (
          <p>
            {selectedMusic.size}곡 선택됨 (최대 {MAX_SELECTION}곡)
          </p>
        )}
      </div>
      <VideoRankingSection videos={videos} filters={filters} toggleMusic={toggleMusic} selectedMusic={selectedMusic} />

      <PlaybackControl videos={videos} selectedMusic={selectedMusic} />
      <div ref={loadMoreRef} className="h-10 w-full">
        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
