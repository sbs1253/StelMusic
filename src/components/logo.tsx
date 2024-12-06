// components/ui/Logo.tsx
import { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className = '', ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* 음표와 별이 결합된 로고 */}
      <g transform="translate(0, -1.5)">
        {/* 별 모양 */}
        <path
          d="M16 8L19.2 14.5L26 15.3L21 20.2L22.4 27L16 23.8L9.6 27L11 20.2L6 15.3L12.8 14.5L16 8Z"
          fill="currentColor"
          className="text-brand-primary"
        />

        {/* 음표 디자인 */}
        <path
          d="M12 18C12 19.6569 10.6569 21 9 21C7.34315 21 6 19.6569 6 18C6 16.3431 7.34315 15 9 15C10.6569 15 12 16.3431 12 18Z"
          fill="currentColor"
          className="text-brand-secondary"
        />
        <path
          d="M11 10V18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-brand-secondary"
        />
      </g>

      {/* StelMusic 텍스트 */}
      <text x="32" y="22" className="text-xl font-bold" fill="currentColor">
        StelMusic
      </text>
    </svg>
  );
}
