'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHardwareTier } from '@/hooks/useHardwareTier';

/**
 * Tích hợp Lenis Smooth Inertial Scroll đồng bộ với vòng lặp GSAP Ticker.
 * Tinh chỉnh độ đằm & quán tính chậm rãi (lerp: 0.065, duration: 1.55s).
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const { tier } = useHardwareTier();

  useEffect(() => {
    if (tier === 'reduced') return;

    gsap.registerPlugin(ScrollTrigger);

    const updateTicker = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
    };
  }, [tier]);

  useEffect(() => {
    if (tier === 'reduced') return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        lenisRef.current?.lenis?.scrollTo(0, { duration: 1.45 });
        return;
      }

      const section = document.querySelector(href);
      if (section) {
        e.preventDefault();
        lenisRef.current?.lenis?.scrollTo(section as HTMLElement, {
          offset: -72,
          duration: 1.45,
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [tier]);

  if (tier === 'reduced') {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: 0.065,
        duration: 1.55,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
