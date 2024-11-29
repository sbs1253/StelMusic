export const formatViewCount = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M 회`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K 회`;
  }
  return `${count} 회`;
};

export const formatLikeCount = (count: number): string => {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const getVideoThumbnail = (video_id: string): string => {
  return `https://img.youtube.com/vi/${video_id}/mqdefault.jpg`;
};
