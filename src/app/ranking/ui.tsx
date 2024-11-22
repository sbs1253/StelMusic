'use client';

import { SortType, YoutubeVideo } from 'src/mocks/types_db';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Header } from '@/app/ranking/components/headerSection';
import { VideoRankingSection } from '@/app/ranking/components/videoRankingSection';
import PlaybackControl from '@/app/ranking/components/playControl';

interface ContentProps {
  initialData: YoutubeVideo[];
  currentTag: SortType;
}

export default function Ui({ initialData, currentTag = 'views' }: ContentProps) {
  const router = useRouter();
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(new Set());

  const handleTagSelect = (tag: SortType) => {
    router.push(`/ranking?q=${tag}`);
  };

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
      <Suspense fallback={<div>loding</div>}>
        <Header title="인기 순위" selectedTag={currentTag} handleTagSelect={handleTagSelect} />
      </Suspense>
      <Suspense fallback={<VideoRankingSection.Skeleton />}>
        <VideoRankingSection
          initialData={initialData}
          currentTag={currentTag}
          toggleMusic={toggleMusic}
          selectedMusic={selectedMusic}
        />
      </Suspense>
      <PlaybackControl currentTag={currentTag} selectedMusic={selectedMusic} />
    </div>
  );
}
