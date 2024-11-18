import RankingSkeleton from '@/components/skeleton/rankingSkeleton';
import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RankingSkeleton />}>{children}</Suspense>;
}
