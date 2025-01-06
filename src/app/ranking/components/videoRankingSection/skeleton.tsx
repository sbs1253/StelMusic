export function Skeleton() {
  return (
    <div className="animate-pulse flex items-center gap-4 p-3 rounded-lg bg-gray-50">
      {/* 순위 표시 */}
      <div className="flex-shrink-0 w-8 text-center">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </div>

      {/* 썸네일 영역 */}
      <div className="relative flex-shrink-0">
        <div className="w-32 h-24 bg-gray-200 rounded-md"></div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex-1 min-w-0">
        {/* 제목 스켈레톤 */}
        <div className="mb-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        {/* 세부 정보 스켈레톤 */}
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
