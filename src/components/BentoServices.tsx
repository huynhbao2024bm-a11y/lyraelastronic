'use client';

import { useState } from 'react';
import { Bot, Check, Cpu, Globe, Layers, QrCode, ShieldCheck, Smartphone } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { AmbientCanvas } from './AmbientCanvas';
import { QrCodeSvg } from './QrCodeSvg';
import { Reveal } from './Reveal';
import { SpecularCard } from './SpecularCard';

type ChatScenario = 'retail' | 'booking';
type WebAppTab = 'ledger' | 'stock';
type WebViewport = 'desktop' | 'mobile';

/**
 * Section 3: Bento Grid Dịch vụ trên nền Bạc Dịu (#F5F5F7) + Ambient Mist
 * để hiệu ứng Liquid Glass nổi khối quang học rõ rệt.
 */
export function BentoServices() {
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
    <section
      id="dich-vu"
      className="relative scroll-mt-[76px] overflow-hidden bg-[#F5F5F7] py-[110px] lg:py-[150px]"
    >
      <AmbientCanvas variant="band" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[680px]">
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#0071E3]">
              Hệ sinh thái giải pháp
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              <span className="metallic-ink">Thiết kế để vận hành thật.</span>
              <br />
              <span className="text-[#6E6E73]">Không chỉ đẹp trên bản vẽ.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12 lg:gap-6">
          {/* Tile 1 (7 cols): AI Chatbot Chốt Đơn Tự Động */}
          <Reveal className="md:col-span-7" delayMs={0}>
            <SpecularCard className="h-full p-6 sm:p-8" variant="glass">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                      <Bot className="h-4 w-4" />
                      <span>AI Chatbot Chốt Đơn</span>
                    </span>
                    <div className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-white/80 p-1">
                      <button
                        type="button"
                        onClick={() => setChatScenario('retail')}
                        className={`cursor-pointer rounded-full px-3 py-0.5 text-[11px] font-medium transition-colors ${
                          chatScenario === 'retail'
                            ? 'bg-[#1D1D1F] text-white'
                            : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Bán lẻ
                      </button>
                      <button
                        type="button"
                        onClick={() => setChatScenario('booking')}
                        className={`cursor-pointer rounded-full px-3 py-0.5 text-[11px] font-medium transition-colors ${
                          chatScenario === 'booking'
                            ? 'bg-[#1D1D1F] text-white'
                            : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                  <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.025em] text-[#1D1D1F] sm:text-[26px]">
                    Trả lời, báo giá &amp; chốt đơn 24/7
                  </h3>
                  <p className="mt-2 max-w-[50ch] text-[15px] leading-[1.55] text-[#6E6E73]">
                    Tự động hiểu nhu cầu, kiểm tra tồn kho thực và tạo đơn nháp ngay trong khung chat.
                  </p>
                </div>

                {/* Coded Interactive Micro-Mockup */}
                <div className="rounded-2xl border border-black/[0.06] bg-white/85 p-4 sm:p-5">
                  <div className="space-y-2.5 text-[13px]">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={`${chatScenario}-${idx}`}
                        className={`flex ${msg.from === 'bot' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-[1.45] ${
                            msg.from === 'bot'
                              ? 'rounded-tr-sm bg-[#0071E3] text-white'
                              : 'rounded-tl-sm border border-black/[0.06] bg-[#F5F5F7] text-[#1D1D1F]'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3.5 flex items-center justify-between border-t border-black/[0.06] pt-3 text-[11px] text-[#6E6E73]">
                    <span>Đầu ra: Đơn nháp đồng bộ CRM</span>
                    <span className="font-medium text-[#0071E3]">Luồng 3 bước tự động</span>
                  </div>
                </div>
              </div>
            </SpecularCard>
          </Reveal>

          {/* Tile 2 (5 cols): Web App & POS (Anodized Silver Surface) */}
          <Reveal className="md:col-span-5" delayMs={80}>
            <SpecularCard className="h-full p-6 sm:p-8" variant="silver">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                      <Layers className="h-4 w-4" />
                      <span>Web App &amp; POS</span>
                    </span>
                    <div className="flex rounded-full border border-black/[0.06] bg-white/80 p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setWebAppTab('ledger')}
                        className={`cursor-pointer rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                          webAppTab === 'ledger' ? 'bg-[#1D1D1F] text-white' : 'text-[#6E6E73]'
                        }`}
                      >
                        Dòng tiền
                      </button>
                      <button
                        type="button"
                        onClick={() => setWebAppTab('stock')}
                        className={`cursor-pointer rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                          webAppTab === 'stock' ? 'bg-[#1D1D1F] text-white' : 'text-[#6E6E73]'
                        }`}
                      >
                        Tồn kho
                      </button>
                    </div>
                  </div>
                  <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.025em] text-[#1D1D1F]">
                    Phần mềm quản trị theo quy trình riêng
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[#6E6E73]">
                    Kiểm soát doanh thu VND nguyên, tồn kho và công nợ chặt chẽ từng giao dịch.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-white/90 p-4">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
                    <span className="text-[12px] font-semibold text-[#1D1D1F]">
                      {webAppTab === 'ledger' ? 'Chuẩn sổ cái tài chính' : 'Chuẩn kiểm soát kho'}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-[#0071E3]" />
                  </div>
                  <div className="mt-3 space-y-2.5 text-[12px]">
                    {webAppTab === 'ledger' ? (
                      <>
                        <div className="flex items-center justify-between text-[#6E6E73]">
                          <span>Kiểu dữ liệu tiền tệ</span>
                          <span className="font-semibold text-[#1D1D1F]">Số nguyên VND</span>
                        </div>
                        <div className="flex items-center justify-between text-[#6E6E73]">
                          <span>Chống ghi đè &amp; trùng đơn</span>
                          <span className="font-semibold text-[#0071E3]">Idempotency Key</span>
                        </div>
                        <div className="flex items-center justify-between text-[#6E6E73]">
                          <span>Hoàn trả vượt đơn gốc</span>
                          <span className="font-semibold text-[#1D1D1F]">Chặn tại DB</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-[#6E6E73]">
                          <span>Cập nhật xuất / nhập</span>
                          <span className="font-semibold text-[#1D1D1F]">Atomic Transaction</span>
                        </div>
                        <div className="flex items-center justify-between text-[#6E6E73]">
                          <span>Bán âm kho ngoài ý muốn</span>
                          <span className="font-semibold text-[#0071E3]">Chặn tự động</span>
                        </div>
                        <div className="flex items-center justify-between text-[#6E6E73]">
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
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#6E6E73]">
                    Tích điểm, đặt lịch và mua lại nhanh gọn không cần cài app.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-white/90 p-4">
                  <div className="flex items-center gap-3.5">
                    <div className="shrink-0 rounded-xl border border-black/[0.06] bg-white p-1.5">
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
                        onClick={() => setMiniAppExpanded((v) => !v)}
                        className="mt-1.5 inline-flex cursor-pointer items-center gap-1 rounded-full border border-black/[0.08] bg-[#F5F5F7] px-2.5 py-0.5 text-[11px] font-medium text-[#1D1D1F] transition-colors hover:border-[#0071E3]/40"
                      >
                        {miniAppExpanded ? (
                          <>
                            <Check className="h-3 w-3 text-[#0071E3]" />
                            <span>Sẵn sàng quét tại quầy</span>
                          </>
                        ) : (
                          <>
                            <QrCode className="h-3 w-3 text-[#0071E3]" />
                            <span>Xem luồng quét QR</span>
                          </>
                        )}
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
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#6E6E73]">
                    Nâng tầm uy tín thương hiệu với giao diện tối giản và tương thích mọi màn hình.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-white/90 p-4">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5 text-[11px]">
                    <span className="font-medium text-[#6E6E73]">Bố cục hiển thị</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setWebViewport('desktop')}
                        className={`cursor-pointer rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                          webViewport === 'desktop'
                            ? 'bg-[#1D1D1F] text-white'
                            : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setWebViewport('mobile')}
                        className={`cursor-pointer rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                          webViewport === 'mobile'
                            ? 'bg-[#1D1D1F] text-white'
                            : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                        }`}
                      >
                        Mobile
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-center rounded-xl border border-black/[0.05] bg-[#F5F5F7] py-3">
                    {webViewport === 'desktop' ? (
                      <div className="w-4/5 space-y-1.5">
                        <div className="h-2 w-1/2 rounded bg-[#D2D2D7]" />
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="h-6 rounded bg-[#0071E3]/20" />
                          <div className="h-6 rounded bg-[#E5E7EB]" />
                          <div className="h-6 rounded bg-[#E5E7EB]" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 space-y-1.5 rounded-lg border border-black/[0.10] bg-white p-1.5">
                        <div className="h-1.5 w-3/4 rounded bg-[#D2D2D7]" />
                        <div className="h-4 rounded bg-[#0071E3]/20" />
                        <div className="h-3 rounded bg-[#E5E7EB]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SpecularCard>
          </Reveal>

          {/* Tile 5 (4 cols): Tự động hóa & Đồng bộ Đa kênh */}
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
                  <p className="mt-2 text-[14px] leading-[1.55] text-[#6E6E73]">
                    Kết nối Zalo OA, Website và Kho vận để loại bỏ thao tác nhập tay lặp lại.
                  </p>
                </div>

                <div className="rounded-2xl border border-black/[0.06] bg-white/90 p-4">
                  <div className="flex items-center justify-between gap-1.5 text-[11px] font-medium">
                    <div className="silver-surface rounded-lg px-2.5 py-2 text-[#1D1D1F]">
                      Zalo OA
                    </div>
                    <div className="h-px flex-1 bg-[#D2D2D7]" />
                    <div className="rounded-lg border border-[#0071E3]/30 bg-[#0071E3]/10 px-2.5 py-2 font-semibold text-[#0071E3]">
                      AI Engine
                    </div>
                    <div className="h-px flex-1 bg-[#D2D2D7]" />
                    <div className="silver-surface rounded-lg px-2.5 py-2 text-[#1D1D1F]">
                      Kho CRM
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-[#6E6E73]">
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
