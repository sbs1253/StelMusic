import { formatDate, formatLikeCount, formatViewCount } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';
function getCountsByFilter(video, type) {
  return {
    viewCount: type === 'daily' ? video.view_increase : video.view_count,
    likeCount: type === 'daily' ? video.like_increase : video.like_count,
    publishedAt: video.published_at.split('T')[0],
  };
}

export default function Card({ video, index, filters, toggleMusic, selectedMusic }) {
  const { viewCount, likeCount, publishedAt } = getCountsByFilter(video, filters.rankType);
  const sort = {
    views: <span>{formatViewCount(viewCount)}</span>,
    likes: <span>{formatLikeCount(likeCount)}</span>,
    date: <span>{formatDate(publishedAt)}</span>,
  };

  return (
    <div
      className={`relative flex items-center gap-2 p-4 w-full h-14 ${
        selectedMusic.has(video.id) ? 'bg-brand-secondary/30 hover:bg-brand-secondary/40' : 'hover:bg-gray-100'
      }`}
      onClick={() => toggleMusic(video.id)}
    >
      <p className={`w-4 text-center font-bold ${index < 3 ? 'text-brand-primary' : 'text-brand-secondary'}`}>
        {index + 1}
      </p>
      {/* <Image
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        width={48}
        height={40}
        className="w-12 rounded-lg object-contain"
        style={{ width: '48px', height: 'auto' }}
      /> */}
      <div className="w-12 h-10 bg-blue-gray-300"></div>
      <div>
        <Link href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" className="text-sm line-clamp-1">
          {video.title}
        </Link>
        <p className={`text-xs ${selectedMusic.has(video.id) ? 'text-black' : 'text-gray-500'}`}>
          {video.video_owner_channel_title}
        </p>
      </div>
      <div
        className={`absolute bottom-1 right-1 flex gap-1 text-xs ${
          selectedMusic.has(video.video_id) ? 'text-black' : 'text-gray-500'
        }`}
      >
        {/* <span className="text-xs text-gray-500">구독</span> */}
        {sort[filters.sort]}
      </div>
    </div>
  );
}
