import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mastering Agentic AI - The Complete Guide',
  description: 'Learn how to build, deploy, and scale advanced agentic AI systems in this comprehensive ebook.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
