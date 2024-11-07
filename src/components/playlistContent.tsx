'use client';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Image from 'next/image';
import { flexCol, flexColCenter, flexRow } from '@/mixins/styles';
import { useQuery } from '@tanstack/react-query';
import { fetchYoutubePlaylist } from '@/actions/youtube.action';
import MainPopularityranking from './mainPopularityranking';
import { Suspense } from 'react';

export default function PlaylistContent({ initialData }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['playlist'],
    queryFn: () => fetchYoutubePlaylist(),
    initialData,
    staleTime: 1000 * 60 * 5,
  });
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Suspense fallback={<div>loading...</div>}>
      <main>
        <section className="p-2 max-w-[1200px] mx-auto">
          <section className={`container mx-auto`}>
            <VideoSlider videos={data} />
          </section>

          <div className="flex items-center mb-4">
            <EmojiEventsIcon className="mr-1 text-amber-500" />
          </div>

          {data.slice(0, 5).map((video, index) => (
            <VideoRankingCard key={video.id} video={video} index={index} />
          ))}
        </section>
      </main>
    </Suspense>
  );
}

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
          className="rounded-lg object-contain"
          style={{ width: '100px', height: 'auto' }} // 추가
        />

        <div>
          <h3 className="text-sm font-medium line-clamp-2 ">{video.snippet.title}</h3>
        </div>
        <p className="absolute right-1 bottom-1 text-xs text-gray-400">{video.snippet.videoOwnerChannelTitle}</p>
      </div>
    </div>
  );
}

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function VideoSlider({ videos }) {
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
            <VideoDateCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function VideoDateCard({ video }) {
  return (
    <div className="w-[250px] ">
      <div className="relative aspect-video w-full">
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          fill
          className="rounded-lg object-cover"
          sizes="250px"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium line-clamp-2">{video.snippet.title}</h3>
      </div>
    </div>
  );
}

function ArtistCard() {
  return (
    <div className="flex flex-col items-center">
      <div></div>
    </div>
  );
}
