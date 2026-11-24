'use client';

import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  ShieldCheck,
  Smartphone,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  DemoKey,
  TECH_MARQUEE_ROW_1,
  TECH_MARQUEE_ROW_2,
  TECH_PILLARS,
  TechMarqueeItem,
} from '@/config/site';
import { Reveal } from './Reveal';
import { SpecularCard } from './SpecularCard';

interface FlagshipShowcaseProps {
  onOpenDemo: (demoKey: DemoKey) => void;
}

function TechIcon({ name }: { name: TechMarqueeItem['iconName'] }) {
  const cls = 'h-5 w-5 text-[#0071E3]';
  switch (name) {
    case 'globe':
      return <Globe className={cls} />;
    case 'code':
      return <Code2 className={cls} />;
    case 'database':
      return <Database className={cls} />;
    case 'layers':
      return <Layers className={cls} />;
    case 'cloud':
      return <Cloud className={cls} />;
    case 'check':
      return <CheckCircle2 className={cls} />;
    case 'smartphone':
      return <Smartphone className={cls} />;
    case 'bot':
      return <Bot className={cls} />;
    case 'zap':
      return <Zap className={cls} />;
    case 'workflow':
      return <Workflow className={cls} />;
    case 'shield':
      return <ShieldCheck className={cls} />;
    default:
      return <Cpu className={cls} />;
  }
}

function MarqueeCard({ item }: { item: TechMarqueeItem }) {
  return (
    <div className="glass-surface spring-interactive mx-2.5 flex w-[295px] shrink-0 items-center gap-3.5 rounded-[22px] p-3.5 sm:w-[320px] sm:p-4">
      <div className="content-card flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
        <TechIcon name={item.iconName} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[14px] font-semibold tracking-[-0.015em] text-[#1D1D1F]">
            {item.name}
          </p>
          <span className="shrink-0 rounded-full bg-[#0071E3]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0071E3]">
            {item.category}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[12px] text-[#515158]">{item.desc}</p>
      </div>
    </div>
  );
}

/**
 * Section 4: Nền tảng Công nghệ & Kiến trúc Kỹ thuật (#cong-nghe)
 * - Thay thế hoàn toàn phần sản phẩm/nguyên mẫu cũ bằng dải băng chuyền Công nghệ tự chạy ngang (Dual Infinite Marquee)
 * - Kèm 3 trụ cột kỹ thuật cốt lõi trong khung kính trong suốt & nút trải nghiệm trực tiếp cơ chế vận hành.
 */
export function FlagshipShowcase({ onOpenDemo }: FlagshipShowcaseProps) {
  const row1Loop = [...TECH_MARQUEE_ROW_1, ...TECH_MARQUEE_ROW_1];
  const row2Loop = [...TECH_MARQUEE_ROW_2, ...TECH_MARQUEE_ROW_2];

  return (
    <section id="cong-nghe" className="relative scroll-mt-[76px] py-[110px] lg:py-[150px]">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[720px]">
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#0071E3]">
              Nền tảng công nghệ cốt lõi
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              <span className="metallic-ink">Công nghệ hiện đại.</span>
              <br />
              <span className="text-[#515158]">Vận hành bền bỉ từng mili-giây.</span>
            </h2>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.55] text-[#515158]">
              Mọi dự án được xây dựng trên hệ sinh thái công nghệ chuẩn sản xuất — tối ưu tốc độ tải, bảo toàn dữ liệu tài chính và sẵn sàng mở rộng quy mô.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Dual-Row Auto-Scrolling Horizontal Tech Marquee */}
      <Reveal delayMs={90}>
        <div className="marquee-group marquee-mask mx-auto mt-12 max-w-[1440px] space-y-5 overflow-hidden py-4">
          <div className="marquee-track-left">
            {row1Loop.map((item, idx) => (
              <MarqueeCard key={`r1-${item.name}-${idx}`} item={item} />
            ))}
          </div>

          <div className="marquee-track-right">
            {row2Loop.map((item, idx) => (
              <MarqueeCard key={`r2-${item.name}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3 Core Technology Pillars (Translucent Glass Outer + Crisp Elevated Inner Content Cards) */}
      <div className="mx-auto mt-14 max-w-[1120px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TECH_PILLARS.map((pillar, idx) => (
            <Reveal key={pillar.id} delayMs={idx * 90}>
              <SpecularCard className="h-full p-6 sm:p-7" variant="glass">
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <span className="glass-pill inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-[#0071E3]">
                      {pillar.category}
                    </span>

                    <h3 className="mt-4 text-[21px] font-semibold tracking-[-0.02em] leading-[1.22] text-[#1D1D1F]">
                      {pillar.title}
                    </h3>

                    <p className="mt-2.5 text-[14px] leading-[1.55] text-[#515158]">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Crisp Solid Elevated Content Cards on top of Translucent Glass */}
                  <div className="space-y-2.5">
                    {pillar.highlights.map((h) => (
                      <div
                        key={h}
                        className="content-card flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-[#1D1D1F]"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3]" />
                        <span>{h}</span>
                      </div>
                    ))}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onOpenDemo(pillar.id)}
                        className="pill-sheen btn-shadow-graphite inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-5 text-[13px] font-medium text-white hover:bg-[#333336] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
                      >
                        <span>Trải nghiệm công nghệ</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
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
