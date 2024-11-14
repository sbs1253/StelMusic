import { PlayArrowRounded, PlaylistAdd } from '@mui/icons-material';

const PlaybackControl = ({ videos, selectedMusic, onPlayAll, onPlaySelected }) => {
  const hasSelectedMusic = selectedMusic?.size > 0;

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-lg mx-auto bg-white border-t shadow-lg">
      <div className="flex justify-between items-center">
        {hasSelectedMusic ? (
          <>
            <button
              onClick={onPlaySelected}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <PlayArrowRounded />
              <span>선택곡 재생 ({selectedMusic.size}곡)</span>
            </button>
            <button
              onClick={() => onPlayAll(videos)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <PlaylistAdd />
              <span>전체재생</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => onPlayAll(videos)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <PlayArrowRounded />
            <span>전체재생</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaybackControl;
