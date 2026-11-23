import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { SITE_CONFIG } from '@/config/site';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.brandName} — Web App, Zalo Mini App & AI Chatbot Chốt Đơn`,
  description:
    'Studio thiết kế Web App, Website doanh nghiệp chuẩn Apple, Zalo Mini App và Hệ thống AI Chatbot chốt đơn tự động tại Việt Nam. Liên hệ Zalo 07973 85112.',
  keywords: [
    'Lyra Elastronic',
    'Thiết kế Web App',
    'Website doanh nghiệp',
    'Zalo Mini App',
    'AI Chatbot chốt đơn',
    'Thiết kế UI UX chuẩn Apple',
  ],
  openGraph: {
    title: `${SITE_CONFIG.brandName} — Phần mềm tinh gọn, Chốt đơn tự động`,
    description:
      'Thiết kế Web App, Website doanh nghiệp, Zalo Mini App và Hệ thống AI Chatbot chốt đơn tự động.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F5F7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${beVietnamPro.variable}`}>
      <body className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] antialiased selection:bg-[#0071E3]/15 selection:text-[#1D1D1F]">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
