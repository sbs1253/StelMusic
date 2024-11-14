'use server';

export function createPlaylist(input) {
  // YouTube 재생목록 URL 생성
  const baseUrl = 'https://www.youtube.com/watch_videos?video_ids=';
  const playlistUrl = `${baseUrl}${input.videoIds.join(',')}`;

  return playlistUrl;
}
