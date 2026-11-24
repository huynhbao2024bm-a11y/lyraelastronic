'use client';

import { useState } from 'react';
import { DemoKey } from '@/config/site';
import { AmbientCanvas } from './AmbientCanvas';
import { BentoServices } from './BentoServices';
import { DemoModal } from './DemoModal';
import { FinalCtaFooter } from './FinalCtaFooter';
import { FlagshipShowcase } from './FlagshipShowcase';
import { HeroSection } from './HeroSection';
import { Navbar } from './Navbar';
import { ProcessSection } from './ProcessSection';
import { ZaloContactModal } from './ZaloContactModal';

export function StudioApp() {
  const [zaloOpen, setZaloOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<DemoKey | null>(null);

  return (
    <div className="relative min-h-screen text-[#1D1D1F]">
      {/* Nền lụa bạc & tinh thể từ tính tương tác xuyên suốt toàn trang */}
      <AmbientCanvas />

      <div className="relative z-10">
        <Navbar onOpenZalo={() => setZaloOpen(true)} />

        <main>
          <HeroSection onOpenZalo={() => setZaloOpen(true)} />
          <BentoServices />
          <FlagshipShowcase onOpenDemo={(key) => setActiveDemo(key)} />
          <ProcessSection />
        </main>

        <FinalCtaFooter onOpenZalo={() => setZaloOpen(true)} />
      </div>

      <ZaloContactModal open={zaloOpen} onClose={() => setZaloOpen(false)} />
      <DemoModal
        demoKey={activeDemo}
        onClose={() => setActiveDemo(null)}
        onOpenZalo={() => setZaloOpen(true)}
      />
    </div>
  );
}
