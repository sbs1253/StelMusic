export default function Skeleton() {
  return (
    <div className="rounded-2xl bg-brand-background/50 backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 p-4 rounded-xl">
            <div className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-[120px] aspect-video bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
