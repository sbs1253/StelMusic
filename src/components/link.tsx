import Link from 'next/link';

interface VideoLinkProps {
  videoId: string;
  children: React.ReactNode;
  className?: string;
}
export function VideoLink({ videoId, children, className }: VideoLinkProps) {
  return (
    <Link
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      className={className}
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
