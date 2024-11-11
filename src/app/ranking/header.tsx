'use client';

import { IconButton } from '@material-tailwind/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href={'/'} className="absolute left-1 top-1">
        <IconButton variant="text">
          <ArrowBackIosIcon className="h-5 w-5" />
        </IconButton>
      </Link>
      <div className="w-full flex justify-center items-center py-4">
        <h1>인기순위</h1>
      </div>
    </header>
  );
}
