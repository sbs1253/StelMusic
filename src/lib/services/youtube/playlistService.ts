import { PlaylistConfig, PlaylistType, YoutubeVideoResponse } from '@/types/youtube';

export const PLAYLISTS: PlaylistConfig[] = [
  { id: 'PLLjd981H8qSN9PQ8-X6wINqBF1GjGxusy', type: 'cover' },
  { id: 'PLLjd981H8qSMGC4Nir0hD2Gj9n9PDUoHX', type: 'original' },
];

export async function fetchPlaylistVideos(
  playlistId: string,
  playlistType: PlaylistType
): Promise<YoutubeVideoResponse[]> {
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
