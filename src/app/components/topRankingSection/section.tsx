'use client';

import Card from '@/app/components/topRankingSection/card';
import Link from 'next/link';

export default function Section({ topVideo }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-text">인기 TOP 5</h2>
        <Link href="/ranking" className="text-sm text-brand-primary">
          전체보기
        </Link>
      </div>

      <div className="space-y-2">
        {topVideo.slice(0, 5).map((video, index) => (
          <Card key={video.video_id} video={video} index={index} />
        ))}
      </div>
    </div>
  );
}
