export type DemoKey = 'webapp-pos' | 'zalo-miniapp' | 'ai-chatbot';

export const SITE_CONFIG = {
  brandName: 'Lyra Elastronic',
  tagline: 'Thiết kế Web App, Website doanh nghiệp, Zalo Mini App & AI Chatbot chốt đơn tự động',
  phoneDisplay: '07973 85112',
  phoneRaw: '0797385112',
  telHref: 'tel:0797385112',
  zaloHref: 'https://zalo.me/0797385112',
  email: 'huynhbao2024.bm@gmail.com',
  mailtoHref: 'mailto:huynhbao2024.bm@gmail.com',
  logoImageSrc: '/images/lyra-logo.png',
  /**
   * Khi bạn có ảnh QR Zalo cá nhân, đặt file tại `public/images/zalo-qr.png`
   * và đổi giá trị bên dưới thành `'/images/zalo-qr.png'`.
   * Khi để `null`, hệ thống tự render mã QR SVG sắc nét trỏ trực tiếp tới Zalo 07973 85112.
   */
  zaloQrImageSrc: null as string | null,
} as const;

export const NAV_LINKS = [
  { label: 'Dịch vụ', href: '#dich-vu' },
  { label: 'Công nghệ', href: '#cong-nghe' },
  { label: 'Quy trình', href: '#quy-trinh' },
  { label: 'Liên hệ', href: '#lien-he' },
] as const;

export interface TechMarqueeItem {
  name: string;
  category: string;
  desc: string;
  iconName:
    | 'cpu'
    | 'globe'
    | 'shield'
    | 'layers'
    | 'database'
    | 'zap'
    | 'smartphone'
    | 'bot'
    | 'code'
    | 'workflow'
    | 'cloud'
    | 'check';
}

export const TECH_MARQUEE_ROW_1: TechMarqueeItem[] = [
  {
    name: 'Next.js 16 & React 19',
    category: 'Frontend Core',
    desc: 'Tải tức thì, tối ưu SEO cấu trúc',
    iconName: 'globe',
  },
  {
    name: 'TypeScript Strict',
    category: 'Type Safety',
    desc: 'Kiểm soát kiểu dữ liệu chặt chẽ',
    iconName: 'code',
  },
  {
    name: 'PostgreSQL Atomic',
    category: 'Database Engine',
    desc: 'Giao dịch nguyên tử chống sai lệch',
    iconName: 'database',
  },
  {
    name: 'Tailwind CSS v4',
    category: 'Design System',
    desc: 'Giao diện kính quang học chuẩn xác',
    iconName: 'layers',
  },
  {
    name: 'Cloudflare & Vercel Edge',
    category: 'Global CDN',
    desc: 'Phân phối nội dung tốc độ cao',
    iconName: 'cloud',
  },
  {
    name: 'Playwright Automation',
    category: 'Quality Gate',
    desc: 'Kiểm thử tự động đa thiết bị',
    iconName: 'check',
  },
];

export const TECH_MARQUEE_ROW_2: TechMarqueeItem[] = [
  {
    name: 'Zalo Mini App SDK',
    category: 'Mobile Ecosystem',
    desc: 'Mở trực tiếp không cần cài ứng dụng',
    iconName: 'smartphone',
  },
  {
    name: 'AI Function Calling',
    category: 'AI Sales Engine',
    desc: 'Tra cứu bảng giá thật trước khi báo giá',
    iconName: 'bot',
  },
  {
    name: 'Zalo OA & ZNS API',
    category: 'Customer Care',
    desc: 'Gửi xác nhận lịch hẹn & đơn hàng',
    iconName: 'zap',
  },
  {
    name: 'Webhook 2 Chiều',
    category: 'Realtime Sync',
    desc: 'Đồng bộ tức thì giữa Chat và Kho',
    iconName: 'workflow',
  },
  {
    name: 'Idempotent VND Ledger',
    category: 'Financial Guard',
    desc: 'Chống tạo trùng đơn & lệch tiền VND',
    iconName: 'shield',
  },
  {
    name: 'GSAP & Lenis Physics',
    category: 'Motion Engine',
    desc: 'Chuyển động quán tính mượt 60fps',
    iconName: 'cpu',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Khảo sát bài toán',
    description: 'Phân tích quy trình bán hàng, xác định điểm nghẽn và chốt giải pháp.',
  },
  {
    step: '02',
    title: 'Thiết kế giao diện',
    description: 'Dựng giao diện chuẩn Apple, khách hàng duyệt trực quan từng màn hình.',
  },
  {
    step: '03',
    title: 'Lập trình & Tích hợp',
    description: 'Phát triển hệ thống sạch sẽ, kết nối Zalo Mini App và AI Chatbot.',
  },
  {
    step: '04',
    title: 'Kiểm thử & Bàn giao',
    description: 'Kiểm thử bảo mật, đào tạo đội ngũ và đồng hành vận hành lâu dài.',
  },
] as const;

export function formatVnd(amount: number): string {
  return `${Math.round(amount).toLocaleString('vi-VN')} ₫`;
}
