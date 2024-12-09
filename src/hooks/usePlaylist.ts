'use client';

import { createPlaylist } from '@/lib/utils/createPlaylist';

export function usePlaylist() {
  const handlePlayAll = (videos) => {
    if (!videos) return;
    const videoIds = videos.map((v) => v.video_id);
    createPlaylist(videoIds);
  };

  const handlePlaySelected = (selectedMusic) => {
    console.log(selectedMusic);
    if (!selectedMusic) return;
    const selectedVideos = Array.from(selectedMusic).map((v) => v);
    console.log(selectedVideos);
    createPlaylist(selectedVideos);
  };

  return {
    handlePlayAll,
    handlePlaySelected,
  };
}
