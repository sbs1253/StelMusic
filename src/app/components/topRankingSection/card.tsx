import { flexRow } from '@/mixins/styles';
import Image from 'next/image';

export default function Card({ video, index }) {
  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-xl hover:bg-white/50 hover:shadow-lg transition-all duration-300">
      {/* Ranking Number */}
      <div className="flex-shrink-0 w-12 text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-[120px] aspect-video rounded-lg overflow-hidden">
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {/* <PlayCircle className="w-10 h-10 text-white" /> */}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1">{video.snippet.title}</h3>
        <p className="text-sm text-gray-500 truncate">{video.snippet.videoOwnerChannelTitle}</p>
      </div>
    </div>
  );
}
