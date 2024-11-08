import { YoutubeVideo } from 'src/mocks/types_db';
import { mockYoutubeData } from 'src/mocks/youtubeData';
// app/actions/youtube.action.ts
export async function fetchYoutubePlaylist(sortBy: SortType = 'views') {
  // 개발 환경에서는 mock 데이터 사용
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return sortVideos(mockYoutubeData, sortBy) as YoutubeVideo[];
  }

  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const PLAYLIST_ID = process.env.NEXT_PUBLIC_PLAYLIST_ID;

  try {
    const playlistResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const playlistData = await playlistResponse.json();
    const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId).join(',');

    const videoResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!videoResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const videoData = await videoResponse.json();
    const videos = videoData.items.map((video) => ({
      id: video.id,
      viewCount: parseInt(video.statistics.viewCount, 10),
      likeCount: parseInt(video.statistics.likeCount, 10) || 0,
      snippet: playlistData.items.find((item) => item.snippet.resourceId.videoId === video.id).snippet,
    }));
    return sortVideos(videos, sortBy);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
}

export type SortType = 'views' | 'likes' | 'date';

function sortVideos(videos: YoutubeVideo[], sortBy: SortType) {
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
