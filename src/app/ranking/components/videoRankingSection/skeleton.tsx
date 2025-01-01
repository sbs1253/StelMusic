export function Skeleton() {
  return (
    <div className="animate-pulse flex p-4 space-x-4 bg-white rounded-lg">
      <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}
