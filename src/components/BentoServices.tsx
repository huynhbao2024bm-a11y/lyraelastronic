'use client';

import { useState } from 'react';
import { ArrowUpRight, Bot, Check, Cpu, Globe, Layers, QrCode, ShieldCheck, Smartphone } from 'lucide-react';
import { DemoKey, SITE_CONFIG } from '@/config/site';
import { QrCodeSvg } from './QrCodeSvg';
import { Reveal } from './Reveal';
import { SpecularCard } from './SpecularCard';

type ChatScenario = 'retail' | 'booking';
type WebAppTab = 'ledger' | 'stock';
type WebViewport = 'desktop' | 'mobile';

interface BentoServicesProps {
  onOpenDemo: (demoKey: DemoKey) => void;
}

/**
 * Section 3: Bento Grid Dịch vụ
 * - Vỏ thẻ bên ngoài là Kính Trong Suốt (.glass-surface) có viền keyline sắc nét & bóng đổ đa tầng sâu
 * - Các khối nội dung bên trong dùng .content-card trắng tinh có bóng nổi khối.
 */
export function BentoServices({ onOpenDemo }: BentoServicesProps) {
  const [chatScenario, setChatScenario] = useState<ChatScenario>('retail');
  const [webAppTab, setWebAppTab] = useState<WebAppTab>('ledger');
  const [miniAppExpanded, setMiniAppExpanded] = useState(false);
  const [webViewport, setWebViewport] = useState<WebViewport>('desktop');

  const chatMessages =
    chatScenario === 'retail'
      ? [
          { from: 'user', text: 'Khách: Nhắn hỏi giá & tình trạng sản phẩm còn hàng.' },
          { from: 'bot', text: 'AI Bot: Tra cứu bảng giá thật, báo giá VND & tồn kho hiện có.' },
          { from: 'user', text: 'Khách: Xác nhận thông tin giao hàng để lên đơn.' },
        ]
      : [
          { from: 'user', text: 'Khách: Hỏi khung giờ trống & dịch vụ phù hợp.' },
          { from: 'bot', text: 'AI Bot: Kiểm tra lịch trống thực tế & đề xuất khung giờ.' },
          { from: 'user', text: 'Khách: Chọn giờ hẹn & nhận xác nhận qua Zalo.' },
        ];

  return (
    <section id="dich-vu" className="relative scroll-mt-[76px] py-[88px] lg:py-[116px]">
      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[680px]">
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#0071E3]">
              Hệ sinh thái giải pháp
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              <span className="metallic-ink">Thiết kế để vận hành thật.</span>
              <br />
              <span className="text-[#3A3D45]">Không chỉ đẹp trên bản vẽ.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-7">
          {/* Tile 1 (7 cols): AI Chatbot Chốt Đơn */}
          <Reveal className="md:col-span-7" delayMs={0}>
            <SpecularCard className="h-full p-6 sm:p-8" variant="glass">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                      <Bot className="h-4 w-4" />
                      <span>AI Chatbot Chốt Đơn</span>
                    </span>
                    <div className="content-card flex items-center gap-1 rounded-full p-1">
                      <button
                        type="button"
                        onClick={() => setChatScenario('retail')}
                        className={`spring-interactive cursor-pointer rounded-full px-3 py-0.5 text-[11px] font-medium ${
                          chatScenario === 'retail'
                            ? 'bg-[#1D1D1F] text-white shadow-xs'
                            : 'text-[#515158] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Bán lẻ
                      </button>
                      <button
                        type="button"
                        onClick={() => setChatScenario('booking')}
                        className={`spring-interactive cursor-pointer rounded-full px-3 py-0.5 text-[11px] font-medium ${
                          chatScenario === 'booking'
                            ? 'bg-[#1D1D1F] text-white shadow-xs'
                            : 'text-[#515158] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                  <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.025em] text-[#1D1D1F] sm:text-[26px]">
                    Trả lời, báo giá &amp; chốt đơn 24/7
                  </h3>
                  <p className="mt-2 max-w-[50ch] text-[15px] leading-[1.55] text-[#515158]">
                    Tự động hiểu nhu cầu, kiểm tra tồn kho thực và tạo đơn nháp ngay trong khung chat.
                  </p>
                </div>

                {/* Solid Elevated Inner Content Card */}
                <div className="content-card rounded-2xl p-4 sm:p-5">
                  <div className="space-y-2.5 text-[13px]">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={`${chatScenario}-${idx}`}
                        className={`flex ${msg.from === 'bot' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-[1.45] ${
                            msg.from === 'bot'
                              ? 'btn-shadow-blue rounded-tr-sm bg-[#0071E3] text-white'
                              : 'rounded-tl-sm border border-black/[0.06] bg-[#F4F6FA] text-[#1D1D1F] shadow-[0_2px_6px_rgba(15,23,42,0.04)]'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3.5 flex items-center justify-between border-t border-black/[0.08] pt-3 text-[11.5px] text-[#3A3D45]">
                    <span>Đầu ra: Đơn nháp đồng bộ CRM</span>
                    <button
                      type="button"
                      onClick={() => onOpenDemo('ai-chatbot')}
                      className="spring-interactive inline-flex cursor-pointer items-center gap-1 font-semibold text-[#0071E3] hover:underline"
                    >
                      <span>Thử trực tiếp</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </SpecularCard>
          </Reveal>

          {/* Tile 2 (5 cols): Web App & POS */}
          <Reveal className="md:col-span-5" delayMs={80}>
            <SpecularCard className="h-full p-6 sm:p-8" variant="glass">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                      <Layers className="h-4 w-4" />
                      <span>Web App &amp; POS</span>
                    </span>
                    <div className="content-card flex rounded-full p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setWebAppTab('ledger')}
                        className={`spring-interactive cursor-pointer rounded-full px-2.5 py-0.5 font-medium ${
                          webAppTab === 'ledger' ? 'bg-[#1D1D1F] text-white' : 'text-[#515158]'
                        }`}
                      >
                        Dòng tiền
                      </button>
                      <button
                        type="button"
                        onClick={() => setWebAppTab('stock')}
                        className={`spring-interactive cursor-pointer rounded-full px-2.5 py-0.5 font-medium ${
                          webAppTab === 'stock' ? 'bg-[#1D1D1F] text-white' : 'text-[#515158]'
                        }`}
                      >
                        Tồn kho
                      </button>
                    </div>
                  </div>
                  <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.025em] text-[#1D1D1F]">
                    Phần mềm quản trị theo quy trình riêng
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[#515158]">
                    Kiểm soát doanh thu VND nguyên, tồn kho và công nợ chặt chẽ từng giao dịch.
                  </p>
                </div>

                <div className="content-card rounded-2xl p-4">
                  <div className="flex items-center justify-between border-b border-black/[0.08] pb-2.5">
                    <span className="text-[12px] font-semibold text-[#111114]">
                      {webAppTab === 'ledger' ? 'Chuẩn sổ cái tài chính' : 'Chuẩn kiểm soát kho'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenDemo('webapp-pos')}
                      className="spring-interactive inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-[#0071E3] hover:underline"
                    >
                      <span>Thử POS</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-2.5 text-[12px]">
                    {webAppTab === 'ledger' ? (
                      <>
                        <div className="flex items-center justify-between text-[#515158]">
                          <span>Kiểu dữ liệu tiền tệ</span>
                          <span className="font-semibold text-[#1D1D1F]">Số nguyên VND</span>
                        </div>
                        <div className="flex items-center justify-between text-[#515158]">
                          <span>Chống ghi đè &amp; trùng đơn</span>
                          <span className="font-semibold text-[#0071E3]">Idempotency Key</span>
                        </div>
                        <div className="flex items-center justify-between text-[#515158]">
                          <span>Hoàn trả vượt đơn gốc</span>
                          <span className="font-semibold text-[#1D1D1F]">Chặn tại DB</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-[#515158]">
                          <span>Cập nhật xuất / nhập</span>
                          <span className="font-semibold text-[#1D1D1F]">Atomic Transaction</span>
                        </div>
                        <div className="flex items-center justify-between text-[#515158]">
                          <span>Bán âm kho ngoài ý muốn</span>
                          <span className="font-semibold text-[#0071E3]">Chặn tự động</span>
                        </div>
                        <div className="flex items-center justify-between text-[#515158]">
                          <span>Truy vết biến động</span>
                          <span className="font-semibold text-[#1D1D1F]">Audit Trail</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SpecularCard>
          </Reveal>

          {/* Tile 3 (4 cols): Zalo Mini App */}
          <Reveal className="md:col-span-4" delayMs={120}>
            <SpecularCard className="h-full p-6 sm:p-7" variant="glass">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                    <Smartphone className="h-4 w-4" />
                    <span>Zalo Mini App</span>
                  </span>
                  <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                    Chạm mở ngay trong Zalo
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#515158]">
                    Tích điểm, đặt lịch và mua lại nhanh gọn không cần cài app.
                  </p>
                </div>

                <div className="content-card rounded-2xl p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="shrink-0 rounded-xl border border-black/[0.06] bg-white p-1.5 shadow-[0_4px_10px_rgba(15,23,42,0.06)]">
                      <QrCodeSvg
                        value={SITE_CONFIG.zaloHref}
                        size={56}
                        label={`Mã QR Zalo ${SITE_CONFIG.phoneDisplay}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-[#0071E3]">Thẻ thành viên QR</p>
                      <p className="truncate text-[13px] font-semibold text-[#1D1D1F]">
                        Tích điểm theo hóa đơn
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setMiniAppExpanded((v) => !v);
                          onOpenDemo('zalo-miniapp');
                        }}
                        className="spring-interactive mt-1.5 inline-flex cursor-pointer items-center gap-1 rounded-full border border-black/[0.10] bg-[#EFF3F9] px-2.5 py-0.5 text-[11px] font-semibold text-[#111114] hover:border-[#0071E3]/45"
                      >
                        <QrCode className="h-3 w-3 text-[#0071E3]" />
                        <span>{miniAppExpanded ? 'Mở lại mô phỏng' : 'Thử Mini App'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SpecularCard>
          </Reveal>

          {/* Tile 4 (4 cols): Website Doanh nghiệp */}
          <Reveal className="md:col-span-4" delayMs={160}>
            <SpecularCard className="h-full p-6 sm:p-7" variant="glass">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                    <Globe className="h-4 w-4" />
                    <span>Website Doanh nghiệp</span>
                  </span>
                  <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                    Tốc độ tức thì, chuẩn SEO
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#515158]">
                    Nâng tầm uy tín thương hiệu với giao diện tối giản và tương thích mọi màn hình.
                  </p>
                </div>

                <div className="content-card rounded-2xl p-4">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5 text-[11px]">
                    <span className="font-medium text-[#515158]">Bố cục hiển thị</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setWebViewport('desktop')}
                        className={`spring-interactive cursor-pointer rounded-full px-2.5 py-0.5 font-medium ${
                          webViewport === 'desktop'
                            ? 'bg-[#1D1D1F] text-white'
                            : 'text-[#515158] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setWebViewport('mobile')}
                        className={`spring-interactive cursor-pointer rounded-full px-2.5 py-0.5 font-medium ${
                          webViewport === 'mobile'
                            ? 'bg-[#1D1D1F] text-white'
                            : 'text-[#515158] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Mobile
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-center rounded-xl border border-black/[0.05] bg-[#F4F6FA] py-3">
                    {webViewport === 'desktop' ? (
                      <div className="w-4/5 space-y-1.5">
                        <div className="h-2 w-1/2 rounded bg-[#CBD5E1]" />
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="h-6 rounded bg-[#0071E3]/25" />
                          <div className="h-6 rounded bg-[#DCE2EC]" />
                          <div className="h-6 rounded bg-[#DCE2EC]" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 space-y-1.5 rounded-lg border border-black/[0.10] bg-white p-1.5 shadow-xs">
                        <div className="h-1.5 w-3/4 rounded bg-[#CBD5E1]" />
                        <div className="h-4 rounded bg-[#0071E3]/25" />
                        <div className="h-3 rounded bg-[#DCE2EC]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SpecularCard>
          </Reveal>

          {/* Tile 5 (4 cols): Tự động hóa Đa kênh */}
          <Reveal className="md:col-span-4" delayMs={200}>
            <SpecularCard className="h-full p-6 sm:p-7" variant="glass">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                    <Cpu className="h-4 w-4" />
                    <span>Tự động hóa Đa kênh</span>
                  </span>
                  <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                    Liên thông dữ liệu 1 luồng
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#515158]">
                    Kết nối Zalo OA, Website và Kho vận để loại bỏ thao tác nhập tay lặp lại.
                  </p>
                </div>

                <div className="content-card rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-1.5 text-[11px] font-semibold">
                    <div className="rounded-lg border border-black/[0.06] bg-[#F4F6FA] px-2.5 py-2 text-[#1D1D1F] shadow-2xs">
                      Zalo OA
                    </div>
                    <div className="h-px flex-1 bg-[#CBD5E1]" />
                    <div className="btn-shadow-blue rounded-lg bg-[#0071E3] px-2.5 py-2 text-white">
                      AI Engine
                    </div>
                    <div className="h-px flex-1 bg-[#CBD5E1]" />
                    <div className="rounded-lg border border-black/[0.06] bg-[#F4F6FA] px-2.5 py-2 text-[#1D1D1F] shadow-2xs">
                      Kho CRM
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-[#515158]">
                    Webhook thời gian thực · Lưu vết đối soát từng giao dịch
                  </p>
                </div>
              </div>
            </SpecularCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
