import Image from 'next/image';
import Link from 'next/link';

export default function VideoRankingCard({ video, index, selectedTag, toggleMusic, selectedMusic }) {
  const tag = {
    views: <span className="text-xs text-gray-500">{video.viewCount}회</span>,
    likes: <span className="text-xs text-gray-500">{video.likeCount}회</span>,
    date: <span className="text-xs text-gray-500">{video.snippet.publishedAt}</span>,
  };
  return (
    <div
      className={`relative flex items-center gap-2 p-4 w-full h-14 ${
        selectedMusic.has(video.id) ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100'
      }`}
      onClick={() => toggleMusic(video.id)}
    >
      <p className={`w-4 text-center font-bold ${index < 3 ? 'text-brand-primary' : 'text-brand-secondary'}`}>
        {index + 1}
      </p>

      {/* <Image src="/images/1.jpg" alt="1" width={300} height={200} /> */}
      <div className="w-12 h-10 bg-blue-gray-300"></div>
      <div>
        <Link href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" className="text-sm line-clamp-1">
          {video.snippet.title}
        </Link>
        <p className="text-xs text-gray-500">{video.snippet.videoOwnerChannelTitle}</p>
      </div>
      <div className="absolute bottom-1 right-1 flex gap-1">
        {/* <span className="text-xs text-gray-500">구독</span> */}
        {tag[selectedTag]}
      </div>
    </div>
  );
}
