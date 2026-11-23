'use client';

import { ArrowUpRight, CheckCircle2, Layers, MessageSquare, QrCode } from 'lucide-react';
import { DemoKey, SHOWCASE_BLUEPRINTS, SITE_CONFIG } from '@/config/site';
import { AmbientCanvas } from './AmbientCanvas';
import { QrCodeSvg } from './QrCodeSvg';
import { Reveal } from './Reveal';
import { SpecularCard } from './SpecularCard';

interface FlagshipShowcaseProps {
  onOpenDemo: (demoKey: DemoKey) => void;
}

function BlueprintVisual({ id }: { id: DemoKey }) {
  if (id === 'webapp-pos') {
    return (
      <div className="silver-surface flex h-full flex-col justify-between rounded-2xl p-5">
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#0071E3]" />
            <span className="text-[12px] font-semibold text-[#1D1D1F]">Khung Giao diện Thu ngân &amp; Kho</span>
          </div>
          <span className="rounded-full bg-[#0071E3]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#0071E3]">
            Nguyên mẫu
          </span>
        </div>

        <div className="my-4 space-y-2.5 text-[13px]">
          {[
            { label: 'Danh mục & Tồn kho thực tế', note: 'Đồng bộ theo từng chi nhánh' },
            { label: 'Tính tổng tiền nguyên (VND)', note: 'Không dùng số thực, tránh sai số' },
            { label: 'Xuất hóa đơn & Trừ kho Atomic', note: 'Lưu vết nhân viên thực hiện' },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-xl border border-black/[0.05] bg-white/90 px-3.5 py-2.5"
            >
              <div>
                <p className="font-medium text-[#1D1D1F]">{row.label}</p>
                <p className="text-[11px] text-[#6E6E73]">{row.note}</p>
              </div>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3]" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-black/[0.06] pt-3 text-[12px] text-[#6E6E73]">
          <span>Dữ liệu thử nghiệm:</span>
          <span className="font-medium text-[#1D1D1F]">Bạn tự nhập trong bản Demo</span>
        </div>
      </div>
    );
  }

  if (id === 'zalo-miniapp') {
    return (
      <div className="silver-surface flex h-full items-center justify-center rounded-2xl p-5">
        <div className="glass-surface w-full max-w-[300px] rounded-[24px] p-4">
          <div className="flex items-center justify-between pb-3">
            <span className="text-[12px] font-semibold text-[#1D1D1F]">Zalo Mini App</span>
            <span className="rounded-full bg-[#0071E3]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#0071E3]">
              Không cần cài đặt
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3.5">
            <div className="shrink-0 rounded-lg border border-black/[0.06] bg-white p-1">
              <QrCodeSvg value={SITE_CONFIG.zaloHref} size={52} label="QR mẫu Mini App" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#1D1D1F]">Thẻ Thành viên &amp; Lịch hẹn</p>
              <p className="mt-0.5 text-[11px] text-[#6E6E73]">Quét QR check-in ngay tại quầy</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px] font-medium">
            <div className="flex items-center justify-center gap-1 rounded-xl bg-[#0071E3] py-2 text-white">
              <QrCode className="h-3 w-3" />
              <span>Đặt lịch</span>
            </div>
            <div className="rounded-xl border border-black/[0.08] bg-white py-2 text-[#1D1D1F]">
              Tích điểm
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="silver-surface flex h-full flex-col justify-between rounded-2xl p-5">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#0071E3]" />
          <span className="text-[12px] font-semibold text-[#1D1D1F]">Kiến trúc AI Sales Assistant</span>
        </div>
        <span className="text-[11px] font-medium text-[#0071E3]">Luồng tự động</span>
      </div>

      <div className="my-4 space-y-2.5 text-[13px]">
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-black/[0.06] bg-white px-3.5 py-2 text-[#1D1D1F]">
          1. Tiếp nhận câu hỏi tiếng Việt tự nhiên từ khách hàng.
        </div>
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#0071E3] px-3.5 py-2 text-white">
          2. Gọi API kiểm tra bảng giá &amp; tồn kho thật của doanh nghiệp.
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-3 py-2 text-[12px] text-[#1D1D1F]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3]" />
          <span>3. Tạo đơn nháp &amp; đẩy thông báo về hệ thống quản trị</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-black/[0.06] pt-3 text-[11px] text-[#6E6E73]">
        <span>Kênh hỗ trợ: Zalo OA · Fanpage · Web</span>
        <span className="font-medium text-[#1D1D1F]">Chống bịa giá</span>
      </div>
    </div>
  );
}

/**
 * Section 4: Nguyên mẫu giải pháp tương tác trên nền Trắng Sứ (#FFFFFF) + lớp phản chiếu sáng bạc.
 */
export function FlagshipShowcase({ onOpenDemo }: FlagshipShowcaseProps) {
  return (
    <section
      id="ban-mau"
      className="relative scroll-mt-[76px] overflow-hidden bg-[#FFFFFF] py-[110px] lg:py-[150px]"
    >
      <AmbientCanvas variant="band" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[740px]">
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#0071E3]">
              Nguyên mẫu giải pháp tương tác
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              <span className="metallic-ink">Trải nghiệm nguyên mẫu</span>
              <br />
              <span className="text-[#6E6E73]">trước khi bắt tay triển khai.</span>
            </h2>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.55] text-[#6E6E73]">
              Các dự án khách hàng thực tế sẽ được cập nhật tại đây sau khi nghiệm thu. Hiện bạn có thể bấm dùng thử 3 nguyên mẫu hệ thống bên dưới.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-6 lg:space-y-8">
          {SHOWCASE_BLUEPRINTS.map((item, idx) => {
            const reverseOnDesktop = idx % 2 === 1;
            return (
              <Reveal key={item.id} delayMs={idx * 70}>
                <SpecularCard className="p-6 sm:p-8 lg:p-10" variant="glass">
                  <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                    <div
                      className={`lg:col-span-6 ${reverseOnDesktop ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <BlueprintVisual id={item.id} />
                    </div>

                    <div
                      className={`lg:col-span-6 ${reverseOnDesktop ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                      <span className="glass-pill inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-[#0071E3]">
                        {item.badge}
                      </span>

                      <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.025em] leading-[1.2] text-[#1D1D1F] sm:text-[28px]">
                        {item.title}
                      </h3>

                      <div className="mt-5 space-y-3 text-[15px] leading-[1.55]">
                        <p className="text-[#6E6E73]">
                          <strong className="font-semibold text-[#1D1D1F]">Bài toán: </strong>
                          {item.problem}
                        </p>
                        <p className="text-[#6E6E73]">
                          <strong className="font-semibold text-[#1D1D1F]">Giải pháp: </strong>
                          {item.outcome}
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3 border-y border-black/[0.06] py-4">
                        {item.specs.map((m) => (
                          <div key={m.label}>
                            <p className="text-[11px] text-[#6E6E73]">{m.label}</p>
                            <p className="mt-0.5 text-[15px] font-semibold text-[#1D1D1F]">
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {item.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-black/[0.07] bg-[#F5F5F7] px-3 py-1 text-[11px] font-medium text-[#6E6E73]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenDemo(item.id)}
                          className="pill-sheen btn-shadow-graphite inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-5 text-[13px] font-medium text-white hover:bg-[#333336] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
                        >
                          <span>Xem bản Demo</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SpecularCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
