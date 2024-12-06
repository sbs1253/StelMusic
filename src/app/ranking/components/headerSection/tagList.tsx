'use client';

import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';
import { useState } from 'react';

const tagList = [
  {
    label: '조회순',
    value: 'views',
  },
  {
    label: '좋아요순',
    value: 'likes',
  },
  {
    label: '날짜순',
    value: 'date',
  },
];
export default function TagList({ selectedTag, handleTagSelect }) {
  const [activeTab, setActiveTab] = useState(selectedTag);
  const handleClick = (newValue: string) => {
    setActiveTab(newValue);
    handleTagSelect(newValue);
  };
  return (
    <Tabs value={activeTab} className="pt-3">
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className: 'bg-transparent border-b-2 border-brand-primary shadow-none rounded-none',
        }}
      >
        {tagList.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            className={activeTab === value ? 'font-medium' : ''}
            onClick={() => handleClick(value)}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
