export default function RankingSkeleton() {
  return (
    <div className="relative container mx-auto h-screen overflow-y-auto pt-[102px]">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-[9999] max-w-lg mx-auto bg-white/80 backdrop-blur-md border-b">
        <div className="px-4 py-3">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>
        <div className="flex gap-2 p-2 overflow-x-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="pb-[48px]">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 border-b flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Playback Control Skeleton */}
      <div className="fixed bottom-16 left-0 right-0 max-w-lg mx-auto">
        <div className="h-12 bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
