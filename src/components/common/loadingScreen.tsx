'use client';

import Image from 'next/image';

interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white animate-fadeIn">
      <div className="w-64 relative animate-scaleIn">
        <Image
          src="/images/logo-main.png"
          alt="StelMusic Logo"
          width={256}
          height={100}
          priority
          className="object-contain"
        />
      </div>

      {/* 프로그레스 바 */}
      <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
