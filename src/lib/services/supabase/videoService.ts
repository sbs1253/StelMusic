import { createServerSupabaseClient } from '@/lib/utils/supabase/server';
import { getKoreanTime } from '@/lib/utils/date';
import { YoutubeVideoResponse } from '@/types/youtube';

export async function saveVideoToSupabase(videos: YoutubeVideoResponse[]) {
  const supabase = await createServerSupabaseClient();
  const koreanTime = getKoreanTime();
  const mappedVideos = videos.map((video) => ({
    video_id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    channel_id: video.snippet.channelId,
    channel_title: video.snippet.channelTitle,
    published_at: new Date(video.snippet.publishedAt).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    view_count: video.viewCount,
    like_count: video.likeCount,
    thumbnail_url: video.snippet.thumbnails.high.url,
    video_owner_channel_title: video.snippet.videoOwnerChannelTitle,
    playlist_id: video.snippet.playlistId,
    playlist_type: video.playlistType,
    position: video.snippet.position,
    created_at: koreanTime.toISOString(),
    updated_at: koreanTime.toISOString(),
  }));

  const { error } = await supabase.from('youtube_videos').upsert(mappedVideos, {
    onConflict: 'video_id',
  });

  if (error) {
    console.error('Error saving videos:', error);
    throw error;
  }
  return { success: true, count: mappedVideos.length };
}

export async function saveDailyStats(videos: YoutubeVideoResponse[]) {
  const supabase = await createServerSupabaseClient();
  const koreanTime = getKoreanTime();
  const iskoreanTime = new Date(koreanTime).toISOString().split('T')[0];

  const { data } = await supabase.from('daily_video_stats').select('video_id').eq('date', iskoreanTime);

  const dailyStats = videos.map((video) => ({
    video_id: video.id,
    view_count: video.viewCount,
    like_count: video.likeCount,
    date: iskoreanTime,
    created_at: koreanTime.toISOString(),
  }));

  if (process.env.NODE_ENV === 'development') {
    const { error } = await supabase.from('daily_video_stats').upsert(dailyStats, {
      onConflict: 'video_id,date',
    });

    if (error) {
      console.warn('Development: Duplicate entry ignored:', error.message);
      return { success: true, count: 0, message: 'Duplicate entries ignored' };
    }
  } else {
    if (!data?.length) {
      const { error } = await supabase.from('daily_video_stats').insert(dailyStats);
      if (error) {
        console.error('Error saving daily stats:', error);
        throw error;
      }
    } else {
      return {
        success: true,
        count: 0,
        message: 'Daily stats already exist for today',
      };
    }
  }

  return {
    success: true,
    count: dailyStats.length,
    message: 'Daily stats saved successfully',
  };
}
