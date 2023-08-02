import Image from 'next/image';
import './globals.css';

import { inter } from '@/utils/fonts';
export const metadata = {
  title: 'GrabTube',
  description: 'Youtube Video Downloader',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className + ' bg-dark text-white'}>
        <div className="container mx-auto my-10">
          <header>
            <Image height={38} width={196} src="logo.svg" alt="Logo" draggable="false" className="select-none" />
          </header>
          <div className="py-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
