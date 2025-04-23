import '@/app/globals.css';
import type { Metadata } from 'next';
import { AppProviders } from '@/lib/providers';

export const metadata: Metadata = {
  title: 'Studio Admin',
  description: 'Administration dashboard for Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}