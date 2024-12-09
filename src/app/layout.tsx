import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryClientProvider from 'src/config/ReactQueryClientProvider';
import { ThemeProvider } from 'src/config/material-tailwind-theme-provider';
import Footer from '@/components/layout /footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'StelMusic',
  description: '스텔라이브의 노래를 감상해보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryClientProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col mx-auto max-w-lg bg-white relative">
              <main className="flex-1">{children}</main>
              <Footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white" />
            </div>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
