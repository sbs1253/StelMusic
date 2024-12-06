'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from '@/app/components/latestMusicSection/card';

export default function Section({ videos }) {
  return (
    <div className="relative">
      <h2 className="text-xl font-bold text-brand-text">최신 음악</h2>
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
            <Card video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
