import ChannelCard from '@/components/channelCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

export default function channelList() {
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
  return (
    <div>
      <Swiper slidesPerView="auto" spaceBetween={10} freeMode={true} modules={[FreeMode]} className="mySwiper">
        {channels.map((channel) => (
          <SwiperSlide key={channel} style={{ width: 'auto' }}>
            <ChannelCard channel={channel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
