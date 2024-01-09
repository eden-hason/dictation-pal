import { Inter } from 'next/font/google';
import './globals.css';
import NextUIProvider from '@/app/providers/NextUIProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dictation Pal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
