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
  { label: 'Nguyên mẫu', href: '#ban-mau' },
  { label: 'Quy trình', href: '#quy-trinh' },
  { label: 'Liên hệ', href: '#lien-he' },
] as const;

export interface ShowcaseBlueprint {
  id: DemoKey;
  badge: string;
  title: string;
  problem: string;
  outcome: string;
  specs: { label: string; value: string }[];
  stack: string[];
}

export const SHOWCASE_BLUEPRINTS: ShowcaseBlueprint[] = [
  {
    id: 'webapp-pos',
    badge: 'Nguyên mẫu kiến trúc · Web App',
    title: 'Hệ thống Quản trị Bán hàng & Kho theo quy trình riêng',
    problem:
      'Quản lý đơn hàng, tồn kho và công nợ bằng file rời rạc dễ gây sai lệch số liệu khi nhiều nhân viên cùng thao tác.',
    outcome:
      'Một Web App tập trung với giao dịch nguyên tử (atomic), lưu tiền tệ bằng số nguyên VND và lưu vết mọi biến động kho.',
    specs: [
      { label: 'Tiền tệ', value: 'Số nguyên VND' },
      { label: 'An toàn dữ liệu', value: 'Atomic Transaction' },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'zalo-miniapp',
    badge: 'Nguyên mẫu kiến trúc · Zalo Mini App',
    title: 'Zalo Mini App Đặt lịch & Chăm sóc Khách hàng',
    problem:
      'Khách hàng thường ngại tải thêm ứng dụng di động riêng, khiến doanh nghiệp khó duy trì tương tác và lịch hẹn.',
    outcome:
      'Chạm mở trực tiếp bên trong Zalo không cần cài đặt: đặt lịch, quét QR tại quầy và nhận thông báo qua Zalo OA.',
    specs: [
      { label: 'Trải nghiệm', value: 'Mở ngay trong Zalo' },
      { label: 'Kết nối', value: 'Zalo OA & QR' },
    ],
    stack: ['Zalo Mini App SDK', 'Zalo OA', 'QR Check-in'],
  },
  {
    id: 'ai-chatbot',
    badge: 'Nguyên mẫu kiến trúc · AI Automation',
    title: 'AI Chatbot Tư vấn & Tạo đơn Tự động đa kênh',
    problem:
      'Tin nhắn hỏi giá ngoài giờ hoặc lúc cao điểm dễ bị trễ phản hồi, làm giảm tỷ lệ chuyển đổi đơn hàng.',
    outcome:
      'Trợ lý AI tiếp nhận câu hỏi tiếng Việt, tra cứu đúng bảng giá & tồn kho thực tế của shop rồi đẩy đơn nháp về hệ thống.',
    specs: [
      { label: 'Dữ liệu trả lời', value: 'Theo bảng giá thật' },
      { label: 'Đầu ra', value: 'Đơn nháp về CRM' },
    ],
    stack: ['AI Tool-Calling', 'Webhook Đa kênh', 'CRM Sync'],
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
    title: 'Thiết kế nguyên mẫu',
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
