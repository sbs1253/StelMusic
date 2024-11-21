'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LatestMusicCard from '@/app/components/latestMusicSection/latestMusicCard';

export default function LatestMusicSlider({ videos }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={16}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        className="mySwiper"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id} style={{ width: 'auto' }}>
            <LatestMusicCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
