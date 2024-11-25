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

export type SortType = 'views' | 'likes' | 'date';
