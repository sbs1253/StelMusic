import { flexRow } from '@/mixins/styles';
import Image from 'next/image';

export default function VideoTopRankingCard({ video, index }) {
  return (
    <div className="relative p-2 pl-0 transition-all duration-200 hover:translate-y-[-1rem] hover:shadow-lg">
      <div className={`w-full h-full ${flexRow} justify-start items-center gap-3`}>
        {/* Ranking Badge */}
        <p className={`w-10 text-center font-bold ${index < 3 ? 'text-amber-500' : 'text-blue-500'}`}>{index + 1}</p>

        {/* Thumbnail */}
        <Image
          src={video.snippet.thumbnails.medium.url1}
          alt={video.snippet.title}
          width={100}
          height={100}
          className="rounded-lg object-contain"
          style={{ width: '100px', height: 'auto' }}
        />

        <div>
          <h3 className="text-sm font-medium line-clamp-2 ">{video.snippet.title}</h3>
        </div>
        <p className="absolute right-1 bottom-1 text-xs text-gray-400">{video.snippet.videoOwnerChannelTitle}</p>
      </div>
    </div>
  );
}
