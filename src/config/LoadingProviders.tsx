'use client';

import { LoadingScreen } from '@/components/common/loadingScreen';
import { useState, useEffect } from 'react';

interface LoadingProvidersProps {
  children: React.ReactNode;
}

export function LoadingProviders({ children }: LoadingProvidersProps) {
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
    }, 30);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  return <div>{isLoading ? <LoadingScreen progress={progress} /> : children}</div>;
}
