'use client';

import { useEffect } from 'react';

export default function RankingError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">문제가 발생했습니다</h2>
      <button onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded">
        다시 시도
      </button>
    </div>
  );
}
