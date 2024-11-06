'use client';

import PlaylistContent from 'src/components/playlistContent';
import React from 'react';

export default function UI({ initialData }) {
  return (
    <div>
      <PlaylistContent initialData={initialData} />
    </div>
  );
}
