import sortVideos from '@/utils/sortVideos';
import { SortType, YoutubeVideo } from 'src/mocks/types_db';
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
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`;
  try {
    const playlistResponse = await fetch(youtubeUrl, {
      next: { revalidate: 3600 },
    });

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

export async function fetchPlaylistData() {
  let allItems = [];
  let nextPageToken = null;
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const PLAYLIST_ID = 'PLLjd981H8qSN9PQ8-X6wINqBF1GjGxusy';
  const playListIds = ['PLLjd981H8qSN9PQ8-X6wINqBF1GjGxusy', 'PLLjd981H8qSMGC4Nir0hD2Gj9n9PDUoHX'];

  await Promise.all(
    playListIds.map(async (id) => {
      do {
        const pageTokenParam = nextPageToken ? `&pageToken=${nextPageToken}` : '';
        const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${YOUTUBE_API_KEY}${pageTokenParam}`;
        const response = await fetch(url, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }

        const data = await response.json();
        allItems = [...allItems, ...data.items];
        console.log(allItems.length);
        nextPageToken = data.nextPageToken;
      } while (nextPageToken);
    })
  );
  const videoIds = allItems.map((item) => item.snippet.resourceId.videoId);

  const chunkedVideoIds = chunkArray(videoIds, 50);
  let allVideos = [];

  for (const chunk of chunkedVideoIds) {
    const videoIdsString = chunk.join(',');
    const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIdsString}&key=${YOUTUBE_API_KEY}`;

    const videoResponse = await fetch(videoUrl, {
      next: { revalidate: 3600 },
    });

    if (!videoResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const videoData = await videoResponse.json();
    const videos = videoData.items.map((video) => ({
      id: video.id,
      viewCount: parseInt(video.statistics.viewCount, 10),
      likeCount: parseInt(video.statistics.likeCount, 10) || 0,
      snippet: allItems.find((item) => item.snippet.resourceId.videoId === video.id).snippet,
    }));
    allVideos = [...allVideos, ...videos];
    return sortVideos(allVideos, 'views');
  }
}

// 50개씩 나눠서 요청하기 위한 함수
function chunkArray(array: any[], size: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
