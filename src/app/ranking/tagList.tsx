'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TagList({ tagList }) {
  const [selectedTag, setSelectedTag] = useState(tagList[0]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get('q');
  console.log('q', q);
  // if (q === 'views') setSelectedTag('조회순');
  // else if (q === 'likes') setSelectedTag('좋아요순');
  // else if (q === 'date') setSelectedTag('날짜순');
  // else setSelectedTag(q || '');
  useEffect(() => {}, [searchParams]);
  console.log('selectedTag', selectedTag);
  const onTagClick = (tag) => {
    setSelectedTag(tag);
    if (tag === '조회순') router.push(`/ranking?q=views`);
    else if (tag === '좋아요순') router.push(`/ranking?q=likes`);
    else if (tag === '날짜순') router.push(`/ranking?q=date`);
  };

  return (
    <div className="flex gap-x-4">
      {tagList.map((tag) => (
        <TagButton key={tag} onClick={() => onTagClick(tag)} isChecked={selectedTag === tag}>
          {tag}
        </TagButton>
      ))}
    </div>
  );
}

function TagButton({ children, onClick, isChecked }) {
  const buttonStyle = isChecked ? 'bg-white text-primary' : 'bg-black text-white';
  return (
    <button
      className={`rounded-tag-button px-[10px] h-[33px] text-sm font-medium border border-white ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
