'use client';
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import { SortType, YoutubeVideo } from 'src/mocks/types_db';
import { useRouter } from 'next/navigation';
import VideoRankingCard from '@/components/videoRankingCard';
import PageHeader from '@/components/pageHeader';
import { useState } from 'react';
import PlaybackControl from '@/components/playControl';
import { usePlaylist } from '@/hooks/usePlaylist';

interface ContentProps {
  initialVideos: YoutubeVideo[];
  currentTag: SortType;
}

export default function Ui({ initialVideos, currentTag }: ContentProps) {
  const router = useRouter();
  const [selectedMusic, setSelectedMusic] = useState<Set<string>>(new Set());
  const { videos, error } = useYoutubeVideos(currentTag, initialVideos);

  const { handlePlayAll, handlePlaySelected } = usePlaylist({
    videos: initialVideos,
    selectedMusic,
  });

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
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="relative container mx-auto h-screen overflow-y-auto pt-[102px]">
      <PageHeader
        title="인기 순위"
        selectedTag={currentTag}
        handleTagSelect={handleTagSelect}
        showPlayButton={true}
        videos={videos}
      />
      <div className="pb-[48px]">
        {videos.map((video, index) => (
          <VideoRankingCard
            key={video.id}
            video={video}
            index={index}
            selectedTag={currentTag || 'views'}
            toggleMusic={toggleMusic}
            selectedMusic={selectedMusic}
          />
        ))}
      </div>
      <PlaybackControl
        videos={videos}
        selectedMusic={selectedMusic}
        onPlayAll={handlePlayAll}
        onPlaySelected={handlePlaySelected}
      />
    </div>
  );
}
