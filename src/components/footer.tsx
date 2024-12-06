// components/footer.tsx
'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PersonIcon from '@mui/icons-material/Person';
import { Search } from '@mui/icons-material';

export default function Footer({ className = '' }) {
  const pathname = usePathname();
  const navigation = [
    { name: '홈', href: '/', icon: HomeIcon },
    { name: '인기순위', href: '/ranking', icon: WhatshotIcon },
    { name: '검색', href: '/search', icon: Search },
    // { name: '내정보', href: '/profile', icon: PersonIcon },
  ];

  return (
    // <footer className="fixed bottom-0 w-full max-w-lg bg-white z-[9999]">
    <footer className={`h-16 border-t border-gray-100 z-[9999] ${className}`}>
      <nav className="flex justify-around items-center h-16">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
              <Icon className={`${isActive ? 'text-brand-primary' : 'text-gray-500'}`} sx={{ fontSize: 24 }} />
              <span className={`text-xs ${isActive ? 'text-brand-primary' : 'text-gray-500'}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
