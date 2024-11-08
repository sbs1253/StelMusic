'use client';

import { channels } from '@/mocks/channel';
import Image from 'next/image';

export default function ChannelCard({ channel }) {
  return (
    <div className="flex flex-col justify-center items-center flex-shrink-0 max-w-[100px]">
      <Image
        src={channels[channel].imageUrl}
        alt={channels[channel].name}
        width={80}
        height={80}
        className="rounded-full object-contain"
      />
      <p className="text-center text-xs line-clamp-2">{channels[channel].name}</p>
    </div>
  );
}
