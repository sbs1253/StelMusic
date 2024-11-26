'use client';

import { SortType, YoutubeVideo } from 'src/mocks/types_db';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/app/ranking/components/headerSection';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import PlaybackControl from '@/app/ranking/components/playControl';
import { useVideoSorting } from '@/hooks/useVideoSorting';

export default function Ui({ initialVideos, initialSort, totalCount, hasMore }) {
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(() => new Set());
  const { currentSort, handleTagSelect } = useVideoSorting({ initialVideos, initialSort });

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
      <Header title="인기 순위" selectedTag={currentSort} handleTagSelect={handleTagSelect} />
      <VideoRankingSection
        videos={initialVideos}
        currentSort={currentSort}
        toggleMusic={toggleMusic}
        selectedMusic={selectedMusic}
      />
      {/* <PlaybackControl videos={video} selectedMusic={selectedMusic} /> */}
    </div>
  );
}
