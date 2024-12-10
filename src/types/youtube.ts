import { Database } from '@/types/types_db';

export interface YoutubeVideoResponse {
  id: string;
  viewCount: number;
  likeCount: number;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard?: Thumbnail;
      maxres?: Thumbnail;
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
  playlistType: string;
}
// Supabase 테이블 타입
export type YoutubeVideo = Database['public']['Tables']['youtube_videos']['Row'];
export type YoutubeVideoInsert = Database['public']['Tables']['youtube_videos']['Insert'];
export type YoutubeVideoUpdate = Database['public']['Tables']['youtube_videos']['Update'];

export type DailyVideoStat = Database['public']['Tables']['daily_video_stats']['Row'];
export type DailyVideoStatInsert = Database['public']['Tables']['daily_video_stats']['Insert'];
export type DailyVideoStatUpdate = Database['public']['Tables']['daily_video_stats']['Update'];

// Supabase Functions 반환 타입
export type DailyRankingResult = Database['public']['Functions']['get_daily_rankings']['Returns'][0];
export type WeeklyRankingResult = Database['public']['Functions']['get_weekly_rankings']['Returns'][0];

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};
export type PlaylistType = 'all' | 'original' | 'cover';
export type RankType = 'total' | 'daily' | 'weekly';
export type SortBy = 'views' | 'likes' | 'date';

export interface PlaylistConfig {
  id: string;
  type: PlaylistType;
}

export interface VideoOptions {
  playlistType?: PlaylistType;
  sortBy?: SortBy;
  rankType?: RankType;
  limit?: number;
  offset?: number;
  searchQuery?: string;
}

export interface LoadMoreOptions {
  playlistType?: PlaylistType;
  sortBy?: SortBy;
  rankType?: RankType;
  page: number;
  limit?: number;
}

export interface VideoFilters {
  sort: SortBy;
  rankType: RankType;
  playlistType: PlaylistType;
}
