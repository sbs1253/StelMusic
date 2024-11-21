export function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 최신 음악 섹션 스켈레톤 */}
      <section>
        <div className="h-8 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
      </section>

      {/* 인기 순위 섹션 스켈레톤 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </section>

      {/* 채널 섹션 스켈레톤 */}
      <section>
        <div className="h-8 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="h-24 bg-gray-200 rounded animate-pulse" />
      </section>
    </div>
  );
}
