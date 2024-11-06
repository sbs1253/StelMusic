import Logo from 'src/components/logo';
import Link from 'next/link';
import React from 'react';

const logo = [
  {
    url: 'naver-logo',
    alt: 'naver logo',
  },
  {
    url: 'chzzk-logo_01',
    alt: 'chzzk logo',
  },
  {
    url: 'x-logo-white',
    alt: 'x logo',
  },
  {
    url: 'youtube_social_circle_red',
    alt: 'youtube logo',
  },
];

export default function Header() {
  return (
    <header className="px-4 py-2 bg-brand-background flex items-center justify-center z-50">
      <nav className="flex gap-4">
        <Logo url="logo" alt="main logo" width={50} height={50} />
        <ul className="flex items-center justify-center gap-2 text-white">
          {logo.map((logo, idx) => {
            return (
              <li key={idx}>
                <Logo url={logo.url} alt={logo.alt} width={20} height={20} />
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
