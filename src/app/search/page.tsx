import { getVideos } from '@/actions/youtube/video.action.ts';
import { SearchResults } from '@/app/search/components/searchSection';
import { SearchInput } from '@/components/common/searchInput';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q;

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="max-w-sm w-full space-y-4">
          <h1 className="text-xl font-bold text-center text-gray-900">원하는 콘텐츠를 검색해보세요</h1>
          <SearchInput />
          <p className="text-sm text-center text-brand-text">스트리머의 이름이나 노래 제목으로 검색할 수 있습니다</p>
        </div>
      </div>
    );
  }

  // 검색 결과 가져오기
  const initialResults = await getVideos({
    searchQuery: query,
    playlistType: 'all',
    sortBy: 'views',
    limit: 30,
  });

  return (
    <>
      {/* 고정된 검색바 */}
      <div className="sticky top-0 py-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <SearchInput />
          <div className="mt-2 flex items-baseline gap-2">
            <h1 className="text-lg font-medium text-gray-900">&quot;{query}&quot;</h1>
            <span className="text-sm text-brand-text">검색결과 {initialResults.totalCount.toLocaleString()}개</span>
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="max-w-2xl mx-auto px-4">
        <SearchResults initialData={initialResults} />
      </div>
    </>
  );
}
