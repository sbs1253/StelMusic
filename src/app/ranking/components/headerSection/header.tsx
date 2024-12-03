'use client';

import TagList from '@/app/ranking/components/headerSection/tagList';
import { IconButton } from '@material-tailwind/react';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FilterTabs from '@/app/ranking/components/headerSection/filterTabs';

const filterParams = {
  sort: [
    { label: '조회순', value: 'views' },
    { label: '좋아요순', value: 'likes' },
    { label: '최신순', value: 'date' },
  ],
  rankType: [
    { label: '전체', value: 'total' },
    { label: '일간', value: 'daily' },
    { label: '주간', value: 'weekly' },
  ],
  playlistType: [
    { label: '전체', value: 'all' },
    { label: '오리지널', value: 'original' },
    { label: '커버', value: 'cover' },
  ],
} as const;
export default function Section({ title, filters, onFilterChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] max-w-lg mx-auto bg-white/80 backdrop-blur-md border-b">
      <div className="relative px-4 py-3">
        <Link href={'/'} className="absolute left-1 top-1/2 -translate-y-1/2">
          <IconButton variant="text">
            <ArrowBackIosIcon className="h-5 w-5" />
          </IconButton>
        </Link>
        <h1 className="text-xl font-bold text-center">{title}</h1>
      </div>

      <div className="flex flex-col gap-1 px-4 pb-2">
        <div className="flex flex-nowrap justify-around items-center gap-2 ">
          <FilterTabs
            options={filterParams.rankType}
            value={filters.rankType}
            onChange={(value) => onFilterChange('rankType', value)}
          />
          <FilterTabs
            options={filterParams.playlistType}
            value={filters.playlistType}
            onChange={(value) => onFilterChange('playlistType', value)}
          />
        </div>
        <FilterTabs
          options={filterParams.sort}
          value={filters.sort}
          onChange={(value) => onFilterChange('sort', value)}
          variant="fullWidth"
        />
      </div>
    </header>
  );
}

Section.Skeleton = function Skeleton() {
  return (
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
  );
};
