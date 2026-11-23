# Lyra Elastronic — Studio Profile & Interactive Showcase

Trang Web Profile / Studio dịch vụ phần mềm của **Lyra Elastronic**, thiết kế theo chuẩn **Apple Pro Dark** và tối ưu tỷ lệ chuyển đổi (Conversion) qua Zalo.

## Công nghệ
- Next.js (Static Export `output: 'export'`) — load tức thì, deploy miễn phí trên Vercel hoặc Cloudflare Pages.
- TypeScript + Tailwind CSS v4 + Font `Inter` (hỗ trợ đầy đủ dấu tiếng Việt).
- Adaptive Hardware Tiering: tự nhận diện cấu hình thiết bị (`hardwareConcurrency`, `deviceMemory`, `prefers-reduced-motion`) để bật/giảm hiệu ứng mượt mà trên mọi phần cứng.

## Thay ảnh QR Zalo cá nhân (khi có ảnh)
1. Đặt ảnh QR Zalo của bạn vào `public/images/zalo-qr.png`.
2. Mở `src/config/site.ts` và cập nhật:
   ```ts
   zaloQrImageSrc: '/images/zalo-qr.png',
   ```
   *(Mặc định trang đang tự render mã QR SVG chuẩn quét được dẫn thẳng tới `https://zalo.me/0797385112` để không phát sinh lỗi 404 trước khi bạn thêm ảnh).*

## Chạy và Build Static
```bash
npm install
npm run dev      # Chạy local tại http://localhost:3000
npm run build    # Xuất thư mục static out/ sẵn sàng deploy Vercel / Cloudflare Pages
```
