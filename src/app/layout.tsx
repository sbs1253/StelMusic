import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryClientProvider from 'src/config/ReactQueryClientProvider';
import { ThemeProvider } from 'src/config/material-tailwind-theme-provider';
import Header from 'src/components/header';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-lg max-h-screen m-auto border border-black">
        <ReactQueryClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
