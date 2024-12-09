'use server';

import { LoadMoreOptions, VideoOptions } from '@/types/youtube';
import { createServerSupabaseClient } from '@/lib/utils/supabase/server';

export async function getVideos({
  playlistType = 'all',
  sortBy = 'views',
  rankType = 'total',
  limit = 30,
  offset = 0,
  searchQuery = '',
}: VideoOptions = {}) {
  const supabase = await createServerSupabaseClient();
  try {
    // 랭킹 조회 (일간/주간)
    if (['daily', 'weekly'].includes(rankType)) {
      const functionName = rankType === 'daily' ? 'get_daily_rankings' : 'get_weekly_rankings';

      const { data, error } = await supabase.rpc(functionName, {
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
    }

    // 전체 순위 조회
    let query = supabase.from('youtube_videos').select('*', { count: 'exact' });
    if (searchQuery.trim()) {
      query = query.or(`title.ilike.%${searchQuery}%,` + `video_owner_channel_title.ilike.%${searchQuery}%`);
    }
    if (playlistType !== 'all') {
      query = query.eq('playlist_type', playlistType);
    }

    const orderMap = {
      views: 'view_count',
      likes: 'like_count',
      date: 'published_at',
    };
    // 필터에 따라 정렬
    query = query.order(orderMap[sortBy], { ascending: false });

    const { data, error, count } = await query.range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      videos: data,
      totalCount: count,
      hasMore: count ? offset + limit < count : false,
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

export async function loadMoreVideos(options: LoadMoreOptions) {
  try {
    const offset = (options.page - 1) * (options.limit ?? 30);
    const result = await getVideos({ ...options, offset });

    return {
      ...result,
      nextPage: result.hasMore ? options.page + 1 : null,
    };
  } catch (error) {
    console.error('Error in loadMoreVideos:', error);
    throw new Error('Failed to load more videos');
  }
}
