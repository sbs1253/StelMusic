'use client';

import { SortType, YoutubeVideo } from 'src/mocks/types_db';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from '@/app/ranking/components/headerSection';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import PlaybackControl from '@/app/ranking/components/playControl';
import { useVideoSorting } from '@/hooks/useVideoSorting';

interface ContentProps {
  initialData: YoutubeVideo[];
}

export default function Ui({ initialData }: ContentProps) {
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(new Set());
  const { videos, currentSort, handleTagSelect, isPending } = useVideoSorting({ initialData });
  console.log(isPending);
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
      {isPending ? (
        <VideoRankingSection.Skeleton />
      ) : (
        <VideoRankingSection
          videos={videos}
          currentSort={currentSort}
          toggleMusic={toggleMusic}
          selectedMusic={selectedMusic}
        />
      )}

      <PlaybackControl currentTag={currentSort} selectedMusic={selectedMusic} />
    </div>
  );
}
