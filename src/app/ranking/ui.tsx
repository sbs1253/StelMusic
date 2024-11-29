'use client';

import { Suspense, useState } from 'react';
import { Header } from '@/app/ranking/components/headerSection';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import PlaybackControl from '@/app/ranking/components/playControl';
import { useVideoManagement } from '@/hooks/useVideoManagement';

export default function Ui({ initialData, initialFilters }) {
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(() => new Set());
  const { videos, filters, updateFilter } = useVideoManagement({
    initialData,
    initialFilters,
  });
  const toggleMusic = (musicId) => {
    setSelectedMusic((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(musicId)) {
        newSelected.delete(musicId);
      } else {
        newSelected.add(musicId);
      }
      return newSelected;
    });
  };

  return (
    <div className="relative container mx-auto h-screen overflow-y-auto pt-[102px]">
      <Header title="인기 순위" filters={filters} onFilterChange={updateFilter} />
      <Suspense fallback={<VideoRankingSection.Skeleton />}>
        <VideoRankingSection
          videos={videos}
          filters={filters}
          toggleMusic={toggleMusic}
          selectedMusic={selectedMusic}
        />
      </Suspense>
      {selectedMusic.size > 0 && (
        <PlaybackControl videos={videos.filter((video) => selectedMusic.has(video.id))} selectedMusic={selectedMusic} />
      )}
    </div>
  );
}
