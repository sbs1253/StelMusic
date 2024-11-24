'use client';

import { SortType, YoutubeVideo } from 'src/mocks/types_db';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/app/ranking/components/headerSection';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import PlaybackControl from '@/app/ranking/components/playControl';
import { useVideoSorting } from '@/hooks/useVideoSorting';

interface ContentProps {
  initialData: YoutubeVideo[];
  initialSort: SortType;
}

export default function Ui({ initialData, initialSort }: ContentProps) {
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(() => new Set());
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  const { videos, currentSort, handleTagSelect, isPending } = useVideoSorting({ initialData, initialSort });
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

  // if (!isClient) {
  //   return <VideoRankingSection.Skeleton />;
  // }

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
      {selectedMusic ? <PlaybackControl videos={videos} selectedMusic={selectedMusic} /> : null}
      {/* <PlaybackControl videos={videos} selectedMusic={selectedMusic} /> */}
    </div>
  );
}
