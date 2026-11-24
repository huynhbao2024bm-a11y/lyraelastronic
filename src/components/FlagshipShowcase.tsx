'use client';

import {
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
  TECH_MARQUEE_ROW_1,
  TECH_MARQUEE_ROW_2,
  TechMarqueeItem,
} from '@/config/site';
import { Reveal } from './Reveal';

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
    <div className="glass-surface spring-interactive mx-3 flex w-[315px] shrink-0 items-center gap-4 rounded-[24px] p-4 sm:w-[345px] sm:p-4.5">
      <div className="content-card flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-white to-[#F2F6FC]">
        <TechIcon name={item.iconName} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[15px] font-semibold tracking-[-0.015em] text-[#111114]">
            {item.name}
          </p>
          <span className="shrink-0 rounded-full border border-[#0071E3]/20 bg-[#0071E3]/12 px-2.5 py-0.5 text-[10px] font-semibold text-[#0071E3]">
            {item.category}
          </span>
        </div>
        <p className="mt-1 truncate text-[12.5px] font-medium text-[#3A3D45]">{item.desc}</p>
      </div>
    </div>
  );
}

/**
 * Section 4: Nền tảng Công nghệ & Kiến trúc Kỹ thuật (#cong-nghe)
 * Đã loại bỏ hoàn toàn 3 thẻ dọc bên dưới theo yêu cầu; tập trung trọn vẹn vào
 * dải băng chuyền Công nghệ tự động chạy ngang sắc nét, nổi khối rõ rệt.
 */
export function FlagshipShowcase() {
  const row1Loop = [...TECH_MARQUEE_ROW_1, ...TECH_MARQUEE_ROW_1];
  const row2Loop = [...TECH_MARQUEE_ROW_2, ...TECH_MARQUEE_ROW_2];

  return (
    <section id="cong-nghe" className="relative scroll-mt-[76px] py-[88px] lg:py-[116px]">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[720px]">
            <p className="text-[13px] font-semibold tracking-[-0.01em] text-[#0071E3]">
              Nền tảng công nghệ cốt lõi
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.03em] leading-[1.1]">
              <span className="metallic-ink">Công nghệ hiện đại.</span>
              <br />
              <span className="text-[#3A3D45]">Vận hành bền bỉ từng mili-giây.</span>
            </h2>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.55] text-[#3A3D45]">
              Mọi hệ thống được phát triển trên các nền tảng chuẩn sản xuất — tối ưu tốc độ tải, bảo toàn dữ liệu tài chính và sẵn sàng mở rộng quy mô.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Dual-Row Auto-Scrolling Horizontal Tech Marquee */}
      <Reveal delayMs={90}>
        <div className="marquee-group marquee-mask mx-auto mt-11 max-w-[1480px] space-y-6 overflow-hidden py-5">
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
    </section>
  );
}
