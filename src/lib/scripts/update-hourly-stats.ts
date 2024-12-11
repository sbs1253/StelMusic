import { saveVideoToSupabase } from '@/lib/services/supabase/videoService';
import { fetchPlaylistVideos, PLAYLISTS } from '@/lib/services/youtube/playlistService';

async function updateHourlyStats() {
  try {
    console.log('Starting hourly stats update...');
    const playlistResults = await Promise.all(
      PLAYLISTS.map((playlist) => fetchPlaylistVideos(playlist.id, playlist.type))
    );
    const allVideos = playlistResults.flat();

    const result = await saveVideoToSupabase(allVideos);
    console.log(`Hourly update completed: ${result.count} videos updated`);
  } catch (error) {
    console.error('Error updating hourly stats:', error);
    process.exit(1);
  }
}

updateHourlyStats();
