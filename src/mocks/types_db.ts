export interface YoutubeVideo {
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

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

// 필터 관련 타입 정의
export type SortOption = 'views' | 'likes' | 'date';
export type RankType = 'total' | 'daily';
export type PlaylistType = 'all' | 'original' | 'cover';

export interface VideoFilters {
  sort: SortOption;
  rankType: RankType;
  playlistType: PlaylistType;
}

export const FILTER_OPTIONS = {
  SORT: {
    VIEWS: 'views',
    LIKES: 'likes',
    DATE: 'date',
  },
  RANK_TYPE: {
    TOTAL: 'total',
    // WEEKLY: 'weekly',
    DAILY: 'daily',
  },
  PLAYLIST_TYPE: {
    ALL: 'all',
    ORIGINAL: 'original',
    COVER: 'cover',
  },
} as const;
