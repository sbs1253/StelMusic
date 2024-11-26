// app/api/cron/daily-update/route.ts
import { fetchYoutubeVideos } from '@/actions/fetchYoutubePlaylist.action';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // 1. YouTube API에서 최신 데이터 가져오기
    const result = await fetchYoutubeVideos();
    // fetchYoutubeVideos 함수는 이미 youtube_videos와 daily_video_stats 모두 업데이트

    return NextResponse.json({
      success: true,
      message: 'Daily update completed',
      count: result.count,
    });
  } catch (error) {
    console.error('Daily update error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update daily stats' }, { status: 500 });
  }
}
