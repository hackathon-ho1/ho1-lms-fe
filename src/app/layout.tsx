'use client';

import { ThemeProvider } from '@emotion/react';
import { Inter } from 'next/font/google';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <ThemeProvider theme={theme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
