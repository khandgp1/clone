import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { MainNav } from '@/components/layout/main-nav';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Maryland's Home Remodeling Experts | Experts Remodel",
  description:
    'Transform your home with top-notch remodeling services in Maryland. Kitchen, bathroom, basement remodeling & more. Free design consultations. Call (877)-965-3854.',
  keywords: [
    'home remodeling Maryland',
    'kitchen remodeling',
    'bathroom remodeling',
    'basement remodeling',
    'home renovation Maryland',
    'Bethesda remodeling',
    'Silver Spring remodeling',
  ],
  openGraph: {
    title: "Maryland's Home Remodeling Experts | Experts Remodel",
    description:
      'Premium home remodeling services throughout Maryland. Free design consultations available.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-cream text-body antialiased">
        <MainNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
