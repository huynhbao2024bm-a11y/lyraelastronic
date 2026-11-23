'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowUpRight,
  CheckCircle2,
  Database,
  Layers,
  MessageSquare,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { useHardwareTier } from '@/hooks/useHardwareTier';
import { AmbientCanvas } from './AmbientCanvas';
import { QrCodeSvg } from './QrCodeSvg';

interface HeroSectionProps {
  onOpenZalo: () => void;
}

type MockTab = 'overview' | 'chatbot' | 'miniapp';

const CORE_MODULES = [
  {
    id: 'orders',
    label: 'Đơn hàng & Thu ngân chống trùng lặp',
    detail: 'Mỗi giao dịch thanh toán gắn khóa idempotency để loại bỏ hoàn toàn lỗi tạo trùng đơn khi mạng chập chờn.',
    specA: 'Số nguyên VND',
    specB: 'Idempotency Key',
  },
  {
    id: 'inventory',
    label: 'Kho vận & Cảnh báo hết hàng',
    detail: 'Trừ kho nằm chung trong giao dịch nguyên tử (atomic) với đơn hàng, đảm bảo không xảy ra âm kho ngoài ý muốn.',
    specA: 'Atomic Ledger',
    specB: 'Cảnh báo định mức',
  },
  {
    id: 'debt',
    label: 'Công nợ khách hàng & Nhà cung cấp',
    detail: 'Tự động đối soát lịch sử thanh toán từng phần, hoàn trả và giới hạn hoàn tiền không vượt quá giá trị đơn gốc.',
    specA: 'Đối soát từng kỳ',
    specB: 'Chặn hoàn vượt mức',
  },
  {
    id: 'rbac',
    label: 'Phân quyền vai trò & Nhật ký thao tác',
    detail: 'Phân tách rạch ròi quyền thu ngân, quản lý kho và chủ cửa hàng kèm nhật ký ghi lại mọi thay đổi quan trọng.',
    specA: 'Kiểm soát vai trò',
    specB: 'Audit Trail đầy đủ',
  },
] as const;

/**
 * Section 2: Hero Section chuẩn Apple Bright Silver & Optical Liquid Glass
 * - Đã gỡ badge nhỏ phía trên theo yêu cầu để mở đầu tinh khiết chuẩn Apple.com
 * - GSAP ScrollTrigger scrub chậm rãi (1.4s), Device Mockup có đổ bóng đa tầng.
 */
export function HeroSection({ onOpenZalo }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<MockTab>('overview');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('orders');
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const { tier } = useHardwareTier();

  const activeModule =
    CORE_MODULES.find((m) => m.id === selectedModuleId) ?? CORE_MODULES[0];

  useGSAP(
    () => {
      if (tier === 'reduced' || !deviceRef.current || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        deviceRef.current,
        {
          scale: 0.94,
          y: 28,
        },
        {
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: deviceRef.current,
            start: 'top 92%',
            end: 'top 32%',
            scrub: 1.4,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [tier] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFFFFF] pt-20 pb-[110px] sm:pt-24 lg:pt-28 lg:pb-[150px]"
    >
      <AmbientCanvas variant="hero" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8">
        <div className="mx-auto max-w-[880px] text-center">
          <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
            <span className="metallic-ink">Phần mềm tinh gọn.</span>
            <br />
            <span className="text-[#6E6E73]">Tỷ lệ chốt đơn vượt trội.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[60ch] text-[17px] font-normal leading-[1.55] tracking-[-0.015em] text-[#6E6E73] sm:text-[19px]">
            Thiết kế Web App, Website doanh nghiệp, Zalo Mini App và AI Chatbot chốt đơn tự động — tinh xảo chuẩn Apple, vận hành thực tế.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenZalo}
              className="pill-sheen btn-shadow-blue inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0071E3] px-7 text-[15px] font-medium tracking-[-0.01em] text-white hover:bg-[#0077ED] sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span>Nhắn Zalo tư vấn ngay</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <a
              href="#ban-mau"
              className="glass-pill pill-sheen inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium tracking-[-0.01em] text-[#1D1D1F] hover:bg-white sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
            >
              <span>Xem nguyên mẫu tương tác</span>
            </a>
          </div>
        </div>

        {/* Anodized Aluminum Device Mockup with Layered Optical Shadow */}
        <div className="mt-16 sm:mt-20">
          <div
            ref={deviceRef}
            style={{ transformOrigin: 'center top', willChange: 'transform' }}
            className="mx-auto max-w-[1000px]"
          >
            <div className="silver-surface device-elevation rounded-[28px] p-2.5 sm:rounded-[34px] sm:p-3.5">
              <div className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-[#FBFBFD] sm:rounded-[24px]">
                {/* Window Chrome */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] bg-[#F5F5F7]/85 px-4 py-3 backdrop-blur-md sm:px-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D2D2D7]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D2D2D7]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D2D2D7]" />
                    <span className="ml-2 hidden text-[12px] font-medium text-[#6E6E73] sm:inline">
                      Lyra System Blueprint
                    </span>
                  </div>

                  {/* Interactive Tab Switcher */}
                  <div
                    role="tablist"
                    aria-label="Chế độ xem kiến trúc hệ thống"
                    className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-white/90 p-1 shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
                  >
                    {(
                      [
                        { id: 'overview', label: 'Web App' },
                        { id: 'chatbot', label: 'AI Chatbot' },
                        { id: 'miniapp', label: 'Zalo Mini App' },
                      ] as const
                    ).map((tab) => {
                      const active = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveTab(tab.id)}
                          className={`cursor-pointer rounded-full px-3.5 py-1 text-[11px] font-medium transition-all duration-300 sm:text-[12px] ${
                            active
                              ? 'bg-[#1D1D1F] text-white shadow-[0_2px_6px_rgba(29,29,31,0.2)]'
                              : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="hidden items-center gap-1.5 text-[11px] font-medium text-[#6E6E73] lg:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0071E3]" />
                    <span>Kiến trúc chuẩn sản xuất</span>
                  </div>
                </div>

                {/* Screen Content */}
                <div className="relative bg-gradient-to-b from-[#F5F5F7]/75 to-[#FFFFFF] p-4 sm:p-7">
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                      <div className="glass-surface flex flex-col justify-between rounded-2xl p-5 lg:col-span-7">
                        <div>
                          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#0071E3]">
                            <Layers className="h-4 w-4" />
                            <span>Chi tiết Module · Chạm từng mục bên phải để xem</span>
                          </div>
                          <p className="mt-2.5 text-[20px] font-semibold tracking-[-0.025em] text-[#1D1D1F]">
                            {activeModule.label}
                          </p>
                          <p className="mt-2 text-[14px] leading-[1.6] text-[#6E6E73]">
                            {activeModule.detail}
                          </p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                          <div className="silver-surface rounded-xl p-3.5">
                            <p className="text-[11px] text-[#6E6E73]">Tiêu chuẩn dữ liệu</p>
                            <p className="mt-1 text-[14px] font-semibold text-[#1D1D1F]">
                              {activeModule.specA}
                            </p>
                          </div>
                          <div className="silver-surface rounded-xl p-3.5">
                            <p className="text-[11px] text-[#6E6E73]">Bảo vệ vận hành</p>
                            <p className="mt-1 text-[14px] font-semibold text-[#1D1D1F]">
                              {activeModule.specB}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="glass-surface flex flex-col justify-between gap-3 rounded-2xl p-5 lg:col-span-5">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-[#6E6E73]">
                            Module lõi bàn giao
                          </span>
                          <Database className="h-4 w-4 text-[#0071E3]" />
                        </div>
                        <div className="space-y-2 text-[13px]">
                          {CORE_MODULES.map((mod) => {
                            const selected = mod.id === activeModule.id;
                            return (
                              <button
                                key={mod.id}
                                type="button"
                                onClick={() => setSelectedModuleId(mod.id)}
                                className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 ${
                                  selected
                                    ? 'border-[#0071E3]/40 bg-white text-[#1D1D1F] shadow-[0_6px_16px_-4px_rgba(0,113,227,0.14)]'
                                    : 'border-black/[0.05] bg-white/70 text-[#6E6E73] hover:bg-white hover:text-[#1D1D1F]'
                                }`}
                              >
                                <ShieldCheck
                                  className={`h-4 w-4 shrink-0 ${
                                    selected ? 'text-[#0071E3]' : 'text-[#86868B]'
                                  }`}
                                />
                                <span className="font-medium">{mod.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'chatbot' && (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                      <div className="glass-surface rounded-2xl p-5 lg:col-span-7">
                        <div className="mb-4 flex items-center justify-between border-b border-black/[0.06] pb-3">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-[#0071E3]" />
                            <span className="text-[13px] font-semibold text-[#1D1D1F]">
                              Cấu trúc luồng xử lý AI Chatbot
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-[#0071E3]">Kịch bản chuẩn</span>
                        </div>
                        <div className="space-y-3 text-[13px]">
                          <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-black/[0.06] bg-white px-4 py-2.5 text-[#1D1D1F] shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                            [Tin nhắn khách] Hỏi sản phẩm, biến thể hoặc khung giờ còn trống.
                          </div>
                          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0071E3] px-4 py-2.5 text-white shadow-[0_6px_16px_-4px_rgba(0,113,227,0.3)]">
                            [AI Bot] Tra cứu trực tiếp bảng giá &amp; tồn kho thật của shop để phản hồi chính xác.
                          </div>
                          <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-black/[0.06] bg-white px-4 py-2.5 text-[#1D1D1F] shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                            [Khách xác nhận] Cung cấp địa chỉ / SĐT để chốt đơn.
                          </div>
                        </div>
                      </div>

                      <div className="glass-surface flex flex-col justify-between rounded-2xl p-5 lg:col-span-5">
                        <div>
                          <p className="text-[12px] font-semibold text-[#0071E3]">
                            Nguyên tắc vận hành AI
                          </p>
                          <ul className="mt-4 space-y-3 text-[13px] text-[#1D1D1F]">
                            <li className="flex items-center gap-2.5">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3]" />
                              <span>Chỉ báo giá từ danh mục đã cấu hình</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3]" />
                              <span>Tự động tạo đơn nháp đẩy về quản trị</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3]" />
                              <span>Chuyển nhân viên trực tiếp khi cần xử lý đặc biệt</span>
                            </li>
                          </ul>
                        </div>
                        <div className="silver-surface mt-5 rounded-xl p-3 text-[12px] text-[#6E6E73]">
                          Hỗ trợ tích hợp Zalo OA, Website &amp; Fanpage.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'miniapp' && (
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                      <div className="glass-surface flex flex-col justify-between rounded-2xl p-5 lg:col-span-7">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[12px] font-semibold text-[#0071E3]">Zalo Mini App Ecosystem</p>
                            <p className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                              Mở trực tiếp từ mã QR hoặc tin nhắn Zalo
                            </p>
                          </div>
                          <Smartphone className="h-5 w-5 text-[#0071E3]" />
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div className="silver-surface rounded-xl p-3.5">
                            <p className="text-[11px] text-[#6E6E73]">Rào cản truy cập</p>
                            <p className="mt-1 text-[14px] font-semibold text-[#1D1D1F]">Không cần cài đặt App</p>
                          </div>
                          <div className="silver-surface rounded-xl p-3.5">
                            <p className="text-[11px] text-[#6E6E73]">Tính năng cốt lõi</p>
                            <p className="mt-1 text-[14px] font-semibold text-[#1D1D1F]">Đặt lịch · Tích điểm · Đặt hàng</p>
                          </div>
                        </div>
                      </div>

                      <div className="glass-surface flex items-center gap-4 rounded-2xl p-5 lg:col-span-5">
                        <div className="shrink-0 rounded-2xl border border-black/[0.06] bg-white p-2 shadow-[0_6px_16px_-4px_rgba(15,23,42,0.08)]">
                          <QrCodeSvg
                            value={SITE_CONFIG.zaloHref}
                            size={84}
                            label={`Mã QR Zalo ${SITE_CONFIG.phoneDisplay}`}
                          />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#1D1D1F]">
                            QR Liên hệ Zalo thật
                          </p>
                          <p className="mt-1 text-[12px] leading-[1.5] text-[#6E6E73]">
                            Quét để nhắn trực tiếp cho {SITE_CONFIG.brandName} ({SITE_CONFIG.phoneDisplay}).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Anodized Aluminum Stand Foot */}
            <div
              aria-hidden="true"
              className="mx-auto h-3.5 w-28 rounded-b-xl border-x border-b border-black/[0.06] bg-gradient-to-b from-[#E5E7EB] to-[#D2D2D7] shadow-[0_8px_16px_-4px_rgba(15,23,42,0.12)]"
            />
            <div
              aria-hidden="true"
              className="mx-auto h-1.5 w-48 rounded-full bg-gradient-to-r from-transparent via-[#D2D2D7] to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
