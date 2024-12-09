'use server';

import { fetchPlaylistVideos, PLAYLISTS } from '@/lib/services/youtube/playlistService';
import { saveVideoToSupabase, saveDailyStats } from '@/lib/services/supabase/videoService';
import { YoutubeVideoResponse } from '@/types/youtube';

export async function fetchYoutubeVideos(): Promise<{ success: boolean; data: YoutubeVideoResponse[]; count: number }> {
  try {
    const playlistResults = await Promise.all(
      PLAYLISTS.map((playlist) => fetchPlaylistVideos(playlist.id, playlist.type))
    );
    const allVideos = playlistResults.flat();
    await Promise.all([saveVideoToSupabase(allVideos), saveDailyStats(allVideos)]);
    return {
      success: true,
      data: allVideos,
      count: allVideos.length,
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
}
