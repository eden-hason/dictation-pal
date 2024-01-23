import { Inter } from 'next/font/google';
import './globals.css';
import NextUIProvider from '@/app/providers/NextUIProvider';
import Navbar from '@/app/components/Navbar';
import { AuthProvider } from '@/app/providers/AuthProvider';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dictation Pal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
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
