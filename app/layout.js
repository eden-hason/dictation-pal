import { Inter } from 'next/font/google';
import './globals.css';
import NextUIProvider from '@/app/providers/NextUIProvider';
import Navbar from '@/app/components/Navbar';
import { AuthProvider } from '@/app/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dictation Pal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
          <NextUIProvider>
            <Navbar />
            {children}
          </NextUIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
