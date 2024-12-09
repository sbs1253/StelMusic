'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from '@mui/icons-material';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearch)}`);
    }
  }, [debouncedSearch, router]);

  return (
    <div className="relative w-full">
      <input
        type="search"
        placeholder="검색어를 입력하세요..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-10 pl-10 pr-4 rounded-lg 
              bg-brand-background/50 
              placeholder:text-gray-400
                focus:outline-none focus:ring-2 
              focus:ring-brand-primary/20 focus:bg-white
                transition-all duration-200"
      />
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 
                  w-5 h-5 text-gray-400"
      />
    </div>
  );
}
