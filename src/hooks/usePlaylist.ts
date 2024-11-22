'use client';

import { YoutubeVideo } from '@/mocks/types_db';
import { createPlaylist } from '@/utils/createPlaylist';

interface UsePlaylistProps {
  videos: YoutubeVideo[];
  selectedMusic?: Set<string>;
}

export function usePlaylist() {
  const handlePlayAll = (videos) => {
    if (!videos) return;
    const videoIds = videos.map((v) => v.id);
    createPlaylist(videoIds);
  };

  const handlePlaySelected = (selectedMusic) => {
    if (!selectedMusic) return;
    const selectedVideos = Array.from(selectedMusic).map((v) => v);
    createPlaylist(selectedVideos);
  };

  return {
    handlePlayAll,
    handlePlaySelected,
  };
}
