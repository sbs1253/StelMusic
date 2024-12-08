import { NextResponse } from 'next/server';
import { fetchYoutubeVideos } from '@/actions/fetchYoutubePlaylist.action';

export const runtime = 'edge';

export async function GET() {
  try {
    const result = await fetchYoutubeVideos();

    return NextResponse.json({
      success: true,
      message: 'Hourly video data updated successfully',
      updatedVideos: result.count,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to update hourly video data:', error);
    return NextResponse.json(
      {
        error: 'Failed to update video data',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
