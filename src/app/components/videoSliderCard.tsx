'use client';

import Image from 'next/image';

export default function VideoDateCard({ video }) {
  return (
    <div className="w-[250px] ">
      <Image
        src={video.snippet.thumbnails.high.url1}
        alt={video.snippet.title}
        width={300}
        height={300}
        className="rounded-lg object-cover"
        style={{ width: '250px', height: 'auto' }}
      />
      <div className="mt-2">
        <h3 className="text-sm font-medium line-clamp-2">{video.snippet.title}</h3>
      </div>
    </div>
  );
}
