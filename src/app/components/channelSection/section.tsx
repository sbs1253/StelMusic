'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { useChannelQuery } from '@/hooks/useChannelQuery';
import { CHANNEL_LIST } from '@/lib/constants';
import Card from '@/app/components/channelSection/card';

export default function Section({ initialChannel }) {
  const { data: channelsData } = useChannelQuery({ initialData: initialChannel });

  return (
    <Swiper slidesPerView="auto" spaceBetween={10} freeMode={true} modules={[FreeMode]} className="mySwiper">
      {CHANNEL_LIST.map((channelName) => (
        <SwiperSlide key={channelName} style={{ width: 'auto' }}>
          <Card channelName={channelName} channelsData={channelsData} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
