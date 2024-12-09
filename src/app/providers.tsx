'use client';

import { LoadingScreen } from '@/components/common/loadingScreen';
import { useState, useEffect } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 10);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  return <div>{isLoading ? <LoadingScreen progress={progress} /> : children}</div>;
}
