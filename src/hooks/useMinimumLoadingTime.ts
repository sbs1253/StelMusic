'use client';

import { useEffect, useState } from 'react';

export function useMinimumLoadingTime(isLoading: boolean, minimumTime = 200) {
  const [isMinLoading, setIsMinLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsMinLoading(true);
    } else {
      const timer = setTimeout(() => {
        setIsMinLoading(false);
      }, minimumTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading, minimumTime]);

  return isLoading || isMinLoading;
}
