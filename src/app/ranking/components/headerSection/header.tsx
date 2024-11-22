'use client';

import TagList from '@/app/ranking/components/headerSection/tagList';
import { IconButton } from '@material-tailwind/react';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface SectionProps {
  selectedTag?: string;
  handleTagSelect?: (tag: string) => void;
  title: string;
}

export default function Section({ selectedTag, handleTagSelect, title }: SectionProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] max-w-lg mx-auto bg-white/80 backdrop-blur-md border-b">
      <Link href={'/'} className="absolute left-1 top-1">
        <IconButton variant="text">
          <ArrowBackIosIcon className="h-5 w-5" />
        </IconButton>
      </Link>
      <div className="px-4 py-3">
        <h1 className="text-xl font-bold text-center">{title}</h1>
      </div>
      {selectedTag && handleTagSelect && <TagList selectedTag={selectedTag} handleTagSelect={handleTagSelect} />}
    </header>
  );
}
