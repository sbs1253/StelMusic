interface TagListProps {
  tagList: { [key: string]: string }[];
  selectedTag: string;
  handleTagSelect: (tag: string) => void;
}

export default function TagList({ tagList, selectedTag, handleTagSelect }: TagListProps) {
  return (
    <div className="flex gap-2">
      {tagList.map((tag) => (
        <button
          key={tag.name}
          onClick={() => handleTagSelect(tag.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTag === tag.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
