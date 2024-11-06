'use client';

import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Image from 'next/image';
import { flexRow } from '@/mixins/styles';

function VideoRankingCard({ video, index }) {
  return (
    <div className="relative p-4 pl-0 transition-all duration-200 hover:translate-y-[-1rem] hover:shadow-lg">
      <div className={`w-full h-full ${flexRow} justify-start items-center gap-3`}>
        {/* Ranking Badge */}
        <p className={`w-10 text-center font-bold ${index < 3 ? 'text-amber-500' : 'text-blue-500'}`}>{index + 1}</p>

        {/* Thumbnail */}
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          width={100}
          height={100}
          className="!w-[100px] rounded-lg object-contain"
        />

        <div>
          <h3 className="text-sm font-medium line-clamp-2 ">{video.snippet.title}</h3>
        </div>
        <p className="absolute right-1 bottom-1 text-xs text-gray-400">{video.snippet.videoOwnerChannelTitle}</p>
      </div>
    </div>
  );
}

function MainPopularityranking({ data }) {
  return (
    <div className="p-2 max-w-[1200px] mx-auto">
      <div className="flex items-center mb-4">
        <EmojiEventsIcon className="mr-1 text-amber-500" />
        <Typography variant="h4" component="h1">
          인기 동영상 순위
        </Typography>
      </div>

      {data.map((video, index) => (
        <VideoRankingCard key={video.id} video={video} index={index} />
      ))}
    </div>
  );
}

export default MainPopularityranking;
