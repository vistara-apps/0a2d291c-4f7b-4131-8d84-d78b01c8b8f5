import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'DreamWeaver AI - Unlock Your Best Sleep',
  description: 'Personalized AI insights for better sleep quality',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
