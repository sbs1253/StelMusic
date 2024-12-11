import { saveDailyStats } from '@/lib/services/supabase/videoService';
import { fetchPlaylistVideos, PLAYLISTS } from '@/lib/services/youtube/playlistService';

async function updateDailyStats() {
  try {
    console.log('Starting daily stats update...');
    const playlistResults = await Promise.all(
      PLAYLISTS.map((playlist) => fetchPlaylistVideos(playlist.id, playlist.type))
    );
    const allVideos = playlistResults.flat();

    const result = await saveDailyStats(allVideos);
    console.log(`Daily update completed: ${result.count} records created`);
  } catch (error) {
    console.error('Error updating daily stats:', error);
    process.exit(1);
  }
}

updateDailyStats();
