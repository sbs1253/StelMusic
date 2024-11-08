import { SortType, YoutubeVideo } from '@/mocks/types_db';

export default function sortVideos(videos: YoutubeVideo[], sortBy: SortType) {
  return [...videos].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.viewCount - a.viewCount;
      case 'likes':
        return b.likeCount - a.likeCount;
      case 'date':
        return new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime();
      default:
        return b.viewCount - a.viewCount;
    }
  });
}
