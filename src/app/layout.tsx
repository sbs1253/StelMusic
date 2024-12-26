import type { Metadata } from 'next';
import './globals.css';
import ReactQueryClientProvider from 'src/config/ReactQueryClientProvider';
import { ThemeProvider } from 'src/config/material-tailwind-theme-provider';
import Footer from '@/components/layout/footer';
import { Providers } from '@/config/providers';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AnalyticsProvider } from '@/config/AnalyticsProvider';

export const metadata: Metadata = {
  title: 'StelMusic',
  description: '스텔라이브의 노래를 감상해보세요!',
  openGraph: {
    title: 'StelMusic',
    description: '스텔라이브의 노래를 감상해보세요!',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://stelmusic.vercel.app',
    siteName: 'StelMusic',
    images: [
      {
        url: 'https://stelmusic.vercel.app/images/logo-main.png',
        width: 800,
        height: 600,
        alt: 'StelMusic Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard bg-brand-background min-h-screen">
        <ReactQueryClientProvider>
          <ThemeProvider>
            <AnalyticsProvider>
              <Providers>
                <div className="min-h-screen flex flex-col mx-auto max-w-lg lg:max-w-5xl bg-white relative">
                  <main className="flex-1">{children}</main>
                  <Footer className="fixed bottom-0 left-0 right-0 max-w-lg lg:max-w-5xl mx-auto bg-white" />
                </div>
              </Providers>
            </AnalyticsProvider>
          </ThemeProvider>
        </ReactQueryClientProvider>
        <GoogleAnalytics gaId="G-34LG3TW696" />
      </body>
    </html>
  );
}
