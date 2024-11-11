'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ url, alt, width = 30, height = 30 }) {
  return (
    <Link href="/">
      <Image src={`/images/${url}.png`} alt={alt} width={width} height={height} />
    </Link>
  );
}
