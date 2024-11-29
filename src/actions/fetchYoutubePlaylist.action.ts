'use server';

import { YoutubeVideo } from '@/mocks/types_db';
import { createServerSupabaseClient } from '@/utils/supabase/server';

type PlaylistType = 'original' | 'cover';
type RankType = 'total' | 'daily';
interface PlaylistConfig {
  id: string;
  type: PlaylistType;
}
const PLAYLISTS: PlaylistConfig[] = [
  { id: 'PLLjd981H8qSN9PQ8-X6wINqBF1GjGxusy', type: 'cover' },
  { id: 'PLLjd981H8qSMGC4Nir0hD2Gj9n9PDUoHX', type: 'original' },
];

async function fetchPlaylistVideos(playlistId: string, playlistType: PlaylistType) {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  let videos = [];
  let nextPageToken: string | undefined;

  try {
    do {
      // 재생목록 항목 가져오기
      const playlistResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}${
          nextPageToken ? `&pageToken=${nextPageToken}` : ''
        }`,
        { next: { revalidate: 3600 } }
      );

      if (!playlistResponse.ok) {
        throw new Error(`Failed to fetch playlist ${playlistId}`);
      }

      const playlistData = await playlistResponse.json();
      const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId).join(',');

      // 비디오 상세 정보 가져오기
      const videoResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      if (!videoResponse.ok) {
        throw new Error(`Failed to fetch video details for playlist ${playlistId}`);
      }

      const videoData = await videoResponse.json();

      const playlistVideos = videoData.items.map((video) => {
        const playlistItem = playlistData.items.find((item) => item.snippet.resourceId.videoId === video.id);

        return {
          id: video.id,
          viewCount: parseInt(video.statistics.viewCount, 10),
          likeCount: parseInt(video.statistics.likeCount, 10) || 0,
          snippet: playlistItem.snippet,
          playlistType,
          playlistId,
        };
      });

      videos = [...videos, ...playlistVideos];
      nextPageToken = playlistData.nextPageToken;
    } while (nextPageToken);

    return videos;
  } catch (error) {
    console.error(`Error fetching playlist ${playlistId}:`, error);
    throw error;
  }
}

export async function fetchYoutubeVideos() {
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
const getKoreanTime = (): Date => {
  const offset = 1000 * 60 * 60 * 9; // UTC+9
  return new Date(Date.now() + offset);
};
async function saveVideoToSupabase(videos: YoutubeVideo[]) {
  const supabase = await createServerSupabaseClient();
  const koreanTime = getKoreanTime();
  console.log(koreanTime);
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
    created_at: koreanTime,
    updated_at: koreanTime,
  }));
  const { error } = await supabase.from('youtube_videos').upsert(mappedVideos, {
    onConflict: 'video_id',
  });

  if (error) {
    console.error('Error saving videos:', error);
    throw error;
  }
  console.log(koreanTime);
  // console.log(mappedVideos);
  return { success: true, count: mappedVideos.length };
}

async function saveDailyStats(videos: YoutubeVideo[]) {
  const supabase = await createServerSupabaseClient();

  const koreanTime = getKoreanTime();
  const iskoreanTime = new Date(koreanTime).toISOString().split('T')[0];

  const { data: existingData } = await supabase.from('daily_video_stats').select('video_id').eq('date', iskoreanTime);

  const dailyStats = videos.map((video) => ({
    video_id: video.id,
    view_count: video.viewCount,
    like_count: video.likeCount,
    date: iskoreanTime, // 명시적으로 날짜 지정
  }));

  // 개발 환경에서는 upsert, 프로덕션에서는 기존 데이터가 없을 때만 삽입
  if (process.env.NODE_ENV === 'development') {
    const { error } = await supabase.from('daily_video_stats').upsert(dailyStats, {
      onConflict: 'video_id,date',
      ignoreDuplicates: true, // 중복 무시 옵션 추가
    });

    if (error) {
      console.warn('Development: Duplicate entry ignored:', error.message);
      return { success: true, count: 0, message: 'Duplicate entries ignored' };
    }
  } else {
    // 프로덕션 환경에서는 해당 날짜에 데이터가 없을 때만 삽입
    // 00시 00분에만 데이터 삽입하고 1시간 마다 업데이트될때는 방지하기위함
    if (!existingData?.length) {
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

export async function getVideos(
  options: {
    playlistType?: 'original' | 'cover' | 'all';
    sortBy?: 'views' | 'likes' | 'date';
    rankType?: RankType;
    limit?: number;
    offset?: number;
  } = {}
) {
  const { playlistType = 'all', sortBy = 'views', rankType = 'total', limit = 50, offset = 0 } = options;

  const supabase = await createServerSupabaseClient();

  try {
    if (rankType === 'daily') {
      // 일간 순위 조회
      const { data, error } = await supabase.rpc('get_daily_rankings', {
        p_playlist_type: playlistType === 'all' ? null : playlistType,
      });
      if (error) throw error;
      // 페이지네이션 적용
      const paginatedData = data.slice(offset, offset + limit);

      return {
        videos: paginatedData,
        totalCount: data.length,
        hasMore: offset + limit < data.length,
      };
    } else {
      // 전체 순위 조회
      let query = supabase.from('youtube_videos').select('*', { count: 'exact' });

      if (playlistType !== 'all') {
        query = query.eq('playlist_type', playlistType);
      }
      const orderMap = {
        views: 'view_count',
        likes: 'like_count',
        date: 'published_at',
      };

      query = query.order(orderMap[sortBy], { ascending: false });
      const { data, error, count } = await query.range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        videos: data,
        totalCount: count,
        hasMore: count ? offset + limit < count : false,
      };
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

export async function loadMoreVideos({ sortBy = 'views', page, limit = 30 }: { sortBy; page: number; limit?: number }) {
  const offset = (page - 1) * limit;

  const { videos, totalCount, hasMore } = await getVideos({
    sortBy,
    limit,
    offset,
  });

  return { videos, hasMore };
}
