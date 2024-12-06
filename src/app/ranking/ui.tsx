'use client';

import { useCallback, useState } from 'react';
import { Header } from '@/app/ranking/components/headerSection';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import { useVideoFilters } from '@/hooks/useVideoFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Ui({ initialData, initialFilters }) {
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(() => new Set());
  const { filters, updateFilter } = useVideoFilters(initialFilters);

  const { videos, isLoading, hasMore, loadMoreRef, containerRef } = useInfiniteScroll({
    initialData,
    filters: {
      playlistType: filters.playlistType,
      sortBy: filters.sort,
      rankType: filters.rankType,
    },
  });
  // console.log(videos);
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
    <div ref={containerRef} className="relative container mx-auto h-screen overflow-y-auto pt-[102px]">
      <Header title="인기 순위" filters={filters} onFilterChange={updateFilter} />
      <VideoRankingSection videos={videos} filters={filters} toggleMusic={toggleMusic} selectedMusic={selectedMusic} />
      {/* {selectedMusic.size > 0 && (
        <PlaybackControl videos={videos.filter((video) => selectedMusic.has(video.id))} selectedMusic={selectedMusic} />
      )} */}
      <div ref={loadMoreRef} className="h-10 w-full">
        {isLoading && (
          <div className="flex justify-center py-4">
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}
