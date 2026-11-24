'use client';

import { useEffect, useRef } from 'react';
import { useHardwareTier } from '@/hooks/useHardwareTier';

/**
 * Nền nghệ thuật tương tác toàn trang (Sculpted Liquid Silver Silk & Magnetic Constellation):
 * - Cố định (fixed) phía sau toàn bộ website để MỌI bảng kính trong suốt (.glass-surface)
 *   đều khúc xạ rõ dải lụa bạc - xanh sương chuyển động bên dưới.
 * - Phản hồi đàn hồi tức thì theo trỏ chuột: dải lụa uốn mềm quanh con trỏ, các điểm sáng
 *   bạc kết nối mảnh tinh tế khi rê chuột qua.
 */
export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tier, finePointer } = useHardwareTier();

  useEffect(() => {
    if (tier === 'reduced') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    const startTime = performance.now();

    const pointer = {
      targetX: 0.5,
      targetY: 0.35,
      x: 0.5,
      y: 0.35,
      vx: 0,
      vy: 0,
      active: false,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      if (!finePointer) return;
      pointer.targetX = e.clientX / Math.max(1, window.innerWidth);
      pointer.targetY = e.clientY / Math.max(1, window.innerHeight);
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);

      const t = (now - startTime) * 0.00032;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = window.scrollY || 0;
      const scrollPhase = scrollY * 0.0012;

      if (!pointer.active) {
        pointer.targetX = 0.5 + Math.sin(t * 1.3) * 0.22;
        pointer.targetY = 0.38 + Math.cos(t * 1.05) * 0.16;
      }

      // Spring-damped cursor tracking (đàn hồi mượt tức thì)
      const ax = (pointer.targetX - pointer.x) * 0.14;
      const ay = (pointer.targetY - pointer.y) * 0.14;
      pointer.vx = (pointer.vx + ax) * 0.72;
      pointer.vy = (pointer.vy + ay) * 0.72;
      pointer.x += pointer.vx;
      pointer.y += pointer.vy;

      const px = pointer.x * w;
      const py = pointer.y * h;

      ctx.clearRect(0, 0, w, h);

      // 1. Ba khối cầu quang học (Optical Sapphire-Silver Orbs) tạo độ tương phản rõ sau kính
      const orbs = [
        {
          x: px,
          y: py,
          r: Math.max(w * 0.36, 320),
          c0: 'rgba(0, 113, 227, 0.16)',
          c1: 'rgba(147, 197, 253, 0.18)',
        },
        {
          x: w * (0.2 + Math.sin(t + scrollPhase * 0.5) * 0.12),
          y: h * (0.28 + Math.cos(t * 0.8) * 0.12),
          r: Math.max(w * 0.34, 300),
          c0: 'rgba(148, 163, 184, 0.26)',
          c1: 'rgba(203, 213, 225, 0.18)',
        },
        {
          x: w * (0.82 - Math.cos(t * 0.9 - scrollPhase * 0.4) * 0.12),
          y: h * (0.68 + Math.sin(t * 0.75) * 0.12),
          r: Math.max(w * 0.38, 340),
          c0: 'rgba(56, 139, 253, 0.13)',
          c1: 'rgba(226, 232, 240, 0.24)',
        },
      ];

      for (const orb of orbs) {
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, orb.c0);
        grad.addColorStop(0.5, orb.c1);
        grad.addColorStop(1, 'rgba(238, 242, 247, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Dải lụa kim loại bạc - sương (Sculpted Liquid Silk Ribbons) uốn lượn 3D
      const ribbonCount = tier === 'high' ? 3 : 2;
      for (let r = 0; r < ribbonCount; r++) {
        const baseY = h * (0.24 + r * 0.26);
        const ribbonGrad = ctx.createLinearGradient(0, baseY - 90, 0, baseY + 110);
        if (r === 1) {
          ribbonGrad.addColorStop(0, 'rgba(0, 113, 227, 0)');
          ribbonGrad.addColorStop(0.45, 'rgba(0, 113, 227, 0.085)');
          ribbonGrad.addColorStop(0.75, 'rgba(255, 255, 255, 0.55)');
          ribbonGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          ribbonGrad.addColorStop(0, 'rgba(148, 163, 184, 0)');
          ribbonGrad.addColorStop(0.48, 'rgba(148, 163, 184, 0.15)');
          ribbonGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.65)');
          ribbonGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.beginPath();
        const step = 24;
        for (let x = 0; x <= w + step; x += step) {
          const dist = Math.hypot(x - px, baseY - py);
          const pull = Math.max(0, 1 - dist / 360) * 34 * (pointer.y > baseY / h ? 1 : -1);
          const y =
            baseY +
            Math.sin(x * 0.0032 + t * (2.1 + r * 0.4) + scrollPhase + r * 1.7) * 36 +
            Math.cos(x * 0.0018 - t * 1.5 + r) * 20 +
            pull;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Độ dày dải lụa
        for (let x = w + step; x >= 0; x -= step) {
          const dist = Math.hypot(x - px, baseY - py);
          const pull = Math.max(0, 1 - dist / 360) * 34 * (pointer.y > baseY / h ? 1 : -1);
          const y =
            baseY +
            68 +
            Math.sin(x * 0.0032 + t * (2.1 + r * 0.4) + scrollPhase + r * 1.7 + 0.55) * 28 +
            pull * 0.7;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = ribbonGrad;
        ctx.fill();

        // Viền sáng bạc sắc nét dọc sống lụa
        ctx.beginPath();
        for (let x = 0; x <= w + step; x += step) {
          const dist = Math.hypot(x - px, baseY - py);
          const pull = Math.max(0, 1 - dist / 360) * 34 * (pointer.y > baseY / h ? 1 : -1);
          const y =
            baseY +
            Math.sin(x * 0.0032 + t * (2.1 + r * 0.4) + scrollPhase + r * 1.7) * 36 +
            Math.cos(x * 0.0018 - t * 1.5 + r) * 20 +
            pull;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle =
          r === 1 ? 'rgba(0, 113, 227, 0.18)' : 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = r === 1 ? 1.2 : 1.4;
        ctx.stroke();
      }

      // 3. Lưới tinh thể bạc từ tính (Magnetic Silver Lattice) đàn hồi quanh con trỏ
      const spacing = w < 640 ? 54 : 46;
      const influence = w < 640 ? 150 : 230;
      const activeNodes: { x: number; y: number; f: number }[] = [];

      for (let gx = (w % spacing) / 2; gx < w; gx += spacing) {
        for (let gy = (h % spacing) / 2; gy < h; gy += spacing) {
          const dx = gx - px;
          const dy = gy - py;
          const dist = Math.hypot(dx, dy);

          if (dist < influence) {
            const f = Math.pow(1 - dist / influence, 1.65);
            const push = f * 10;
            const nx = dist > 0.1 ? gx + (dx / dist) * push : gx;
            const ny = dist > 0.1 ? gy + (dy / dist) * push : gy;
            activeNodes.push({ x: nx, y: ny, f });

            ctx.fillStyle = `rgba(0, 113, 227, ${(0.18 + f * 0.48).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(nx, ny, 1.3 + f * 1.9, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = 'rgba(100, 116, 139, 0.13)';
            ctx.beginPath();
            ctx.arc(gx, gy, 1.05, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Nối các tia bạc siêu mảnh giữa các hạt đang nằm trong vùng từ trường con trỏ
      if (tier === 'high' && finePointer && activeNodes.length > 1) {
        ctx.lineWidth = 0.8;
        for (let i = 0; i < activeNodes.length; i++) {
          const a = activeNodes[i];
          for (let j = i + 1; j < activeNodes.length; j++) {
            const b = activeNodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < spacing * 1.45) {
              const alpha = Math.min(a.f, b.f) * 0.28;
              ctx.strokeStyle = `rgba(0, 113, 227, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [tier, finePointer]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Static dimensional pearl-silver & mist base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, #FFFFFF 0%, #EEF2F7 52%, #E5EBF3 100%)',
        }}
      />
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
}
