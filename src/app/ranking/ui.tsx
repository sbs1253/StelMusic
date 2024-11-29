'use client';

import { useState } from 'react';
import { Header } from '@/app/ranking/components/headerSection';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import { useVideoFilters } from '@/hooks/useVideoFilters';

export default function Ui({ initialData, initialFilters }) {
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(() => new Set());
  const { filters, updateFilter } = useVideoFilters(initialFilters);

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
      <VideoRankingSection
        videos={initialData.videos}
        filters={filters}
        toggleMusic={toggleMusic}
        selectedMusic={selectedMusic}
      />
      {/* {selectedMusic.size > 0 && (
        <PlaybackControl videos={videos.filter((video) => selectedMusic.has(video.id))} selectedMusic={selectedMusic} />
      )} */}
    </div>
  );
}
