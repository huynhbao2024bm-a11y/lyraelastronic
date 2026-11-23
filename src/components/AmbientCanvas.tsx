'use client';

import { useEffect, useRef } from 'react';
import { useHardwareTier } from '@/hooks/useHardwareTier';

interface AmbientCanvasProps {
  variant?: 'hero' | 'band';
}

/**
 * Nền tương tác động chuẩn Apple Precision Hardware:
 * 1. Ma trận vi điểm bạc (Architectural Silver Micro-Grid) uốn cong nhẹ và bừng sáng
 *    mềm mại theo vị trí con trỏ chuột (damped lerp 0.055) + theo nhịp cuộn trang.
 * 2. Dải ánh sáng khúc xạ bạc & xanh sương siêu nhạt trôi chậm tạo chiều sâu thật
 *    phía sau các tấm Liquid Glass.
 */
export function AmbientCanvas({ variant = 'hero' }: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tier, finePointer } = useHardwareTier();

  useEffect(() => {
    if (tier === 'reduced') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    const startTime = performance.now();

    const pointer = {
      targetX: 0.5,
      targetY: 0.38,
      x: 0.5,
      y: 0.38,
      active: false,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      if (!finePointer) return;
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top - 120 || e.clientY > rect.bottom + 120) {
        pointer.active = false;
        return;
      }
      pointer.targetX = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointer.targetY = (e.clientY - rect.top) / Math.max(1, rect.height);
      pointer.active = true;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 },
    );
    observer.observe(canvas);

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (!isVisible) return;

      const t = (now - startTime) * 0.00022; // Nhịp chậm, đằm
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Damped inertia cho vệt sáng theo trỏ chuột
      if (!pointer.active) {
        pointer.targetX = 0.5 + Math.sin(t * 1.1) * 0.14;
        pointer.targetY = 0.36 + Math.cos(t * 0.9) * 0.10;
      }
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      const px = pointer.x * w;
      const py = pointer.y * h;

      ctx.clearRect(0, 0, w, h);

      // 1. Dải ánh sáng khuếch tán quang học trôi chậm
      const r1 = Math.max(w * 0.42, 340);
      const g1 = ctx.createRadialGradient(px, py, 0, px, py, r1);
      g1.addColorStop(0, variant === 'hero' ? 'rgba(210, 228, 250, 0.48)' : 'rgba(210, 228, 250, 0.38)');
      g1.addColorStop(0.45, 'rgba(229, 231, 235, 0.25)');
      g1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const x2 = w * 0.22 + Math.cos(t * 0.8) * (w * 0.08);
      const y2 = h * 0.58 + Math.sin(t * 0.7) * 32;
      const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, Math.max(w * 0.32, 260));
      g2.addColorStop(0, 'rgba(210, 210, 215, 0.34)');
      g2.addColorStop(0.6, 'rgba(245, 245, 247, 0.12)');
      g2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // 2. Đường sóng bạc mảnh (Caustic contour arcs) chuyển động rất chậm
      if (tier === 'high') {
        ctx.save();
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          const offset = i * 48;
          ctx.beginPath();
          const baseY = h * (0.28 + i * 0.16);
          for (let x = 0; x <= w; x += 28) {
            const distToPointer = Math.hypot(x - px, baseY - py);
            const lensPull = Math.max(0, 1 - distToPointer / 320) * 18;
            const y =
              baseY +
              Math.sin(x * 0.0045 + t * 2.2 + i) * 18 +
              Math.cos(x * 0.0025 - t * 1.6 + offset) * 10 -
              lensPull;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle =
            i === 1 ? 'rgba(0, 113, 227, 0.09)' : 'rgba(148, 163, 184, 0.16)';
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Ma trận vi điểm bạc tương tác con trỏ chuột (Precision Architectural Grid)
      const spacing = w < 640 ? 44 : 38;
      const influenceRadius = w < 640 ? 150 : 240;
      const startX = (w % spacing) / 2;
      const startY = (h % spacing) / 2;

      for (let gx = startX; gx < w; gx += spacing) {
        for (let gy = startY; gy < h; gy += spacing) {
          const dx = gx - px;
          const dy = gy - py;
          const dist = Math.hypot(dx, dy);
          const wave = Math.sin(gx * 0.015 + gy * 0.015 + t * 2.5) * 0.5 + 0.5;

          if (dist < influenceRadius) {
            const factor = Math.pow(1 - dist / influenceRadius, 1.8);
            // Hiệu ứng thấu kính đẩy nhẹ hạt ra biên trường sáng
            const push = factor * 7;
            const nx = dist > 0.1 ? gx + (dx / dist) * push : gx;
            const ny = dist > 0.1 ? gy + (dy / dist) * push : gy;
            const radius = 1.05 + factor * 1.45;
            const alpha = 0.14 + factor * 0.34;

            ctx.fillStyle =
              factor > 0.35
                ? `rgba(0, 113, 227, ${(alpha * 0.85).toFixed(3)})`
                : `rgba(110, 110, 115, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(nx, ny, radius, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const subtleAlpha = 0.06 + wave * 0.055;
            ctx.fillStyle = `rgba(134, 134, 139, ${subtleAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(gx, gy, 0.95, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [tier, finePointer, variant]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-28 left-1/2 h-[540px] w-[780px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(210, 228, 250, 0.36) 0%, rgba(229, 231, 235, 0.24) 50%, rgba(255, 255, 255, 0) 76%)',
        }}
      />
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
}
