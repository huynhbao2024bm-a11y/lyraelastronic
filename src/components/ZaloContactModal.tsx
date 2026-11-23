'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Phone, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { QrCodeSvg } from './QrCodeSvg';

interface ZaloContactModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Sheet liên hệ Zalo với vật liệu Kính Trong Suốt Quang Học (Bright Optical Glass)
 */
export function ZaloContactModal({ open, onClose }: ZaloContactModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.phoneRaw);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="zalo-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#F5F5F7]/65 p-0 backdrop-blur-md sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-surface w-full max-w-[440px] rounded-t-[28px] p-6 sm:rounded-[30px] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold text-[#0071E3]">Kết nối trực tiếp</p>
            <h2
              id="zalo-modal-title"
              className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-[#1D1D1F]"
            >
              Trao đổi qua Zalo
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng hộp thoại liên hệ"
            className="silver-surface inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#6E6E73] transition-colors hover:text-[#1D1D1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-[14px] leading-[1.55] text-[#6E6E73]">
          Quét mã QR bằng ứng dụng Zalo hoặc chạm nút bên dưới để mở khung chat với {SITE_CONFIG.brandName}.
        </p>

        {/* QR Code Frame */}
        <div className="silver-surface mt-6 flex flex-col items-center rounded-2xl p-5">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-3">
            {SITE_CONFIG.zaloQrImageSrc ? (
              <img
                src={SITE_CONFIG.zaloQrImageSrc}
                alt={`Mã QR Zalo ${SITE_CONFIG.phoneDisplay}`}
                width={176}
                height={176}
                className="h-[176px] w-[176px] object-contain"
              />
            ) : (
              <QrCodeSvg
                value={SITE_CONFIG.zaloHref}
                size={176}
                label={`Mã QR mở Zalo ${SITE_CONFIG.phoneDisplay}`}
              />
            )}
          </div>
          <p className="mt-3 text-[12px] font-medium text-[#6E6E73]">
            Zalo / SĐT: <span className="font-semibold text-[#1D1D1F]">{SITE_CONFIG.phoneDisplay}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2.5">
          <a
            href={SITE_CONFIG.zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-sheen btn-shadow-blue inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-5 text-[14px] font-medium text-white hover:bg-[#0077ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
          >
            <span>Mở Zalo ngay</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleCopyPhone}
              className="silver-surface pill-sheen inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-[#1D1D1F]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#0071E3]" />
                  <span className="text-[#0071E3]">Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#0071E3]" />
                  <span>Copy SĐT</span>
                </>
              )}
            </button>

            <a
              href={SITE_CONFIG.telHref}
              className="silver-surface pill-sheen inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-[#1D1D1F]"
            >
              <Phone className="h-3.5 w-3.5 text-[#0071E3]" />
              <span>Gọi điện</span>
            </a>
          </div>

          <a
            href={SITE_CONFIG.mailtoHref}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-4 text-[12px] font-medium text-[#6E6E73] transition-colors hover:bg-white hover:text-[#1D1D1F]"
          >
            <Mail className="h-3.5 w-3.5 text-[#0071E3]" />
            <span>{SITE_CONFIG.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
