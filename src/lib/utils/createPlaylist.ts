export function createPlaylist(input) {
  try {
    if (input.length === 0) {
      throw new Error('선택된 동영상이 없습니다.');
    }

    const baseUrl = 'https://www.youtube.com/watch_videos?video_ids=';
    const playlistUrl = `${baseUrl}${input.join(',')}`;

    window.open(playlistUrl, '_blank');
  } catch (error) {
    console.error('재생목록 생성 중 오류 발생:', error);
  }
}
