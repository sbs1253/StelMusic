'use client';

import { YoutubeVideo } from '@/mocks/types_db';
import { createPlaylist as createPlaylistUtil } from '@/utils/createPlaylist';

interface UsePlaylistProps {
  videos: YoutubeVideo[];
  selectedMusic?: Set<string>;
}

export function usePlaylist({ videos, selectedMusic }: UsePlaylistProps) {
  const createPlaylist = (selectedVideos) => {
    try {
      if (selectedVideos.length === 0) {
        throw new Error('선택된 동영상이 없습니다.');
      }

      const videoIds = selectedVideos.map((v) => v.id);
      const playlistUrl = createPlaylistUtil(videoIds);

      window.open(playlistUrl, '_blank');
    } catch (error) {
      console.error('재생목록 생성 중 오류 발생:', error);
    }
  };

  const handlePlayAll = () => createPlaylist(videos);

  const handlePlaySelected = () => {
    if (!selectedMusic) return;
    const selectedVideos = videos.filter((video) => selectedMusic.has(video.id));
    console.log(selectedVideos);
    createPlaylist(selectedVideos);
  };

  return {
    handlePlayAll,
    handlePlaySelected,
  };
}
