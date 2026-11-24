'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/config/site';

interface NavbarProps {
  onOpenZalo: () => void;
}

/**
 * Dynamic Frosted Navbar:
 * - Khi ở đầu trang: thanh kính trong suốt 52px bám sát mép trên.
 * - Khi cuộn xuống (> 28px): tự thu gọn thành viên thuốc kính nổi (Floating Glass Pill)
 *   tách khỏi mép trên, tăng độ mờ kính và viền bắt sáng bạc.
 */
export function Navbar({ onOpenZalo }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? 'px-3 pt-3 sm:px-6' : 'px-0 pt-0'
      }`}
    >
      <div
        className={`mx-auto flex h-[52px] items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'glass-pill max-w-[820px] rounded-full px-4 sm:px-6'
            : 'max-w-full border-b border-black/[0.06] bg-white/75 px-5 backdrop-blur-xl backdrop-saturate-150 sm:px-8'
        }`}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between ${
            scrolled ? '' : 'max-w-[1120px]'
          }`}
        >
          {/* Brand mark */}
          <a
            href="#"
            aria-label={`${SITE_CONFIG.brandName} — Trang chủ`}
            className="inline-flex items-center rounded-full py-0.5 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <img
              src={SITE_CONFIG.logoImageSrc}
              alt={SITE_CONFIG.brandName}
              width={104}
              height={38}
              className="h-[34px] w-auto object-contain sm:h-[38px]"
            />
          </a>

          {/* Desktop links */}
          <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="spring-interactive rounded-full px-2.5 py-1 text-[13px] font-medium tracking-[-0.01em] text-[#515158] hover:bg-white/70 hover:text-[#1D1D1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action pill + Mobile menu toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenZalo}
              className="pill-sheen btn-shadow-blue inline-flex h-8 cursor-pointer items-center justify-center rounded-full bg-[#0071E3] px-4 text-[12px] font-medium tracking-[-0.01em] text-white hover:bg-[#0077ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Nhắn Zalo
            </button>

            <button
              type="button"
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="silver-surface inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#1D1D1F] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown (Liquid Glass Panel) */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-[820px] px-2 md:hidden">
          <nav
            aria-label="Điều hướng di động"
            className="glass-surface flex flex-col gap-1 rounded-[24px] p-3"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-2.5 text-[15px] font-medium text-[#1D1D1F] transition-colors hover:bg-black/[0.04]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
