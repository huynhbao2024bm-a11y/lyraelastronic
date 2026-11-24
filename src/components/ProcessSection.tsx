'use client';

import { PROCESS_STEPS } from '@/config/site';
import { Reveal } from './Reveal';
import { SpecularCard } from './SpecularCard';

/**
 * Section 5: Quy trình làm việc 4 bước
 * Bảng ngoài trong suốt (.glass-surface) + Thẻ nội dung bên trong nổi khối (.content-card).
 */
export function ProcessSection() {
  return (
    <section id="quy-trinh" className="relative scroll-mt-[76px] py-[110px] lg:py-[150px]">
      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[640px]">
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#0071E3]">
              Quy trình tinh gọn
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              <span className="metallic-ink">Từ ý tưởng đến vận hành.</span>
              <br />
              <span className="text-[#515158]">Rõ ràng từng cột mốc.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item, idx) => (
            <Reveal key={item.step} delayMs={idx * 75}>
              <SpecularCard className="h-full p-5 sm:p-6" variant="glass">
                <div className="flex h-full flex-col justify-between gap-6">
                  <div className="flex items-center justify-between px-1">
                    <span className="glass-pill rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.06em] text-[#0071E3]">
                      {item.step}
                    </span>
                    <span className="h-px w-8 bg-black/[0.12]" aria-hidden="true" />
                  </div>

                  <div className="content-card rounded-2xl p-4">
                    <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.55] text-[#515158]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SpecularCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
