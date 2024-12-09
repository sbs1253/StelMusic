import { SearchInput } from '@/components/common/searchInput';
import { Logo } from '@/components/layout /logo';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 max-w-lg mx-auto h-16 bg-white/80 backdrop-blur-md z-50">
      <div className="h-full flex items-center px-4 gap-3">
        <Link href="/" className="flex-shrink-0 text-brand-primary hover:text-brand-secondary transition-colors">
          <Logo className="w-24 h-8" />
        </Link>
        <div className="flex-1">
          <SearchInput />
        </div>
      </div>
    </nav>
  );
}
