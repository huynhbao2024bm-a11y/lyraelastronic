'use client';

import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Reveal } from './Reveal';
import { SpecularCard } from './SpecularCard';

interface FinalCtaFooterProps {
  onOpenZalo: () => void;
}

/**
 * Section 6: Final CTA & Footer
 * Khung lớn ngoài cùng trong suốt sang trọng (.glass-surface) + thẻ nội dung & nút bấm nổi khối.
 */
export function FinalCtaFooter({ onOpenZalo }: FinalCtaFooterProps) {
  return (
    <footer id="lien-he" className="relative scroll-mt-[76px] pt-[88px] pb-10 lg:pt-[116px] lg:pb-12">
      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SpecularCard className="px-6 py-14 text-center sm:px-12 sm:py-20" variant="glass">
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#0071E3]">
              Sẵn sàng triển khai
            </p>
            <h2 className="mx-auto mt-3 max-w-[680px] text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              <span className="metallic-ink">
                Xây dựng hệ thống giúp bạn bán hàng tốt hơn.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-[17px] leading-[1.55] text-[#515158] sm:text-[18px]">
              Nhắn Zalo hoặc gọi trực tiếp để trao đổi bài toán và nhận tư vấn kiến trúc hệ thống hoàn toàn miễn phí.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <button
                type="button"
                onClick={onOpenZalo}
                className="pill-sheen btn-shadow-blue inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0071E3] px-7 text-[15px] font-medium text-white hover:bg-[#0077ED] sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <span>Nhắn Zalo {SITE_CONFIG.phoneDisplay}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <a
                href={SITE_CONFIG.telHref}
                className="content-card pill-sheen inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium text-[#1D1D1F] hover:bg-white sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
              >
                <Phone className="h-4 w-4 text-[#0071E3]" />
                <span>Gọi {SITE_CONFIG.phoneDisplay}</span>
              </a>

              <a
                href={SITE_CONFIG.mailtoHref}
                className="content-card pill-sheen inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium text-[#1D1D1F] hover:bg-white sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
              >
                <Mail className="h-4 w-4 text-[#0071E3]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </SpecularCard>
        </Reveal>

        {/* Minimalist 1-line Apple-grade Copyright Footer with Brand Logo */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/[0.08] pt-6 text-[12px] text-[#515158] sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={SITE_CONFIG.logoImageSrc}
              alt={SITE_CONFIG.brandName}
              width={74}
              height={27}
              className="h-[26px] w-auto object-contain"
            />
            <p>© 2026 {SITE_CONFIG.brandName}. Thiết kế Web App, Zalo Mini App &amp; AI Chatbot.</p>
          </div>
          <p>Zalo / Hotline: {SITE_CONFIG.phoneDisplay} · {SITE_CONFIG.email}</p>
        </div>
      </div>
    </footer>
  );
}
