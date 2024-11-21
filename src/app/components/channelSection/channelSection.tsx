'use client';

import ChannelCard from '@/app/components/channelSection/channelCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { useChannelQuery } from '@/hooks/useChannelQuery';
import { CHANNEL_LIST } from '@/lib/constants';

export default function ChannelSection({ initialChannel }) {
  const { data: channelsData } = useChannelQuery({ initialData: initialChannel });

  return (
    <Swiper slidesPerView="auto" spaceBetween={10} freeMode={true} modules={[FreeMode]} className="mySwiper">
      {CHANNEL_LIST.map((channelName) => (
        <SwiperSlide key={channelName} style={{ width: 'auto' }}>
          <ChannelCard channelName={channelName} channelsData={channelsData} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
