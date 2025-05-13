import { Inter } from 'next/font/google';

import './global.css';
import { appTitle, appDescription } from '@/configs/app';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: appTitle,
  description: appDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
    {/* <html lang="en"> */}
      <body className="flex flex-col min-h-svh bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />

        <main className="flex-1 pt-16 md:pt-28">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
