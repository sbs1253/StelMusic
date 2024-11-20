import ChannelCard from '@/components/channelCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { useChannelQuery } from '@/hooks/useChannelQuery';

const channels = [
  'STEL_LIVE',
  'AIRI_KANNA',
  'AYAYSUNO_YUNI',
  'SHIRAYUKI_HINA',
  'NENEKO_MASHIRO',
  'AKANE_LIZE',
  'ARAHASHI_TABI',
  'TENKO_SHIBUKI',
  'HANAKO_NANA',
  'AOKUMO_RIN',
  'YUZUHA_RIKO',
];

export default function ChannelSection({ initialData }) {
  const { data: channelsData } = useChannelQuery(initialData);

  return (
    <div>
      <Swiper slidesPerView="auto" spaceBetween={10} freeMode={true} modules={[FreeMode]} className="mySwiper">
        {channels.map((channelName) => (
          <SwiperSlide key={channelName} style={{ width: 'auto' }}>
            <ChannelCard channelName={channelName} channelsData={channelsData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
