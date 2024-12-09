'use client';

import Image from 'next/image';

export default function Card({ channelName, channelsData }) {
  return (
    <div className="flex flex-col justify-center items-center flex-shrink-0 max-w-[100px]">
      <Image
        src={channelsData[channelName].imageUrl}
        alt={channelsData[channelName].name}
        width={80}
        height={80}
        className="rounded-full object-contain"
      />
      <p className="text-center text-xs line-clamp-2">{channelsData[channelName].name}</p>
    </div>
  );
}
