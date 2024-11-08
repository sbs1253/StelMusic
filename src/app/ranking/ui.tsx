'use client';
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';
import TagList from './tagList';
import VideoTopRankingCard from '@/components/videoTopRankingCard';
import { SortType, YoutubeVideo } from 'src/mocks/types_db';
import { useRouter } from 'next/navigation';

interface ContentProps {
  initialVideos: YoutubeVideo[];
  currentTag: SortType;
}

const tagList = [
  {
    name: '조회순',
    value: 'views',
  },
  {
    name: '좋아요순',
    value: 'likes',
  },
  {
    name: '날짜순',
    value: 'date',
  },
];

export default function Ui({ initialVideos, currentTag }: ContentProps) {
  const router = useRouter();

  const { videos, isLoading, error } = useYoutubeVideos(currentTag, initialVideos);
  const handleTagSelect = (tag: SortType) => {
    router.push(`/ranking?q=${tag}`);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <TagList tagList={tagList} selectedTag={currentTag || 'views'} handleTagSelect={handleTagSelect} />
      <div className="mt-8 space-y-4">
        {(isLoading ? initialVideos : videos).map((video, index) => (
          <VideoTopRankingCard key={video.id} video={video} index={index} />
        ))}
      </div>
    </div>
  );
}
