'use client';

import { useCallback, useRef } from 'react';
import { useHardwareTier } from '@/hooks/useHardwareTier';

interface SpecularCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'silver';
}

/**
 * Thẻ vật liệu Kính Quang Học Trong Suốt (.glass-surface) hoặc Nhôm Bạc (.silver-surface):
 * - Phản hồi nghiêng 3D nhẹ tức thì theo trỏ chuột (như visionOS / iPadOS)
 * - Tự động đàn hồi (spring) mượt mà về cân bằng khi rời chuột.
 */
export function SpecularCard({
  children,
  className = '',
  variant = 'glass',
}: SpecularCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { tier, finePointer } = useHardwareTier();
  const enableInteractive = tier !== 'reduced' && finePointer;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enableInteractive || !cardRef.current) return;
      const el = cardRef.current;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = x / Math.max(1, rect.width) - 0.5;
      const ny = y / Math.max(1, rect.height) - 0.5;

      el.dataset.pointerActive = 'true';
      el.style.setProperty('--spot-x', `${x}px`);
      el.style.setProperty('--spot-y', `${y}px`);
      el.style.setProperty('--spot-opacity', '1');
      el.style.setProperty('--rx', `${(-ny * 3.2).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(nx * 3.2).toFixed(2)}deg`);
    },
    [enableInteractive],
  );

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.dataset.pointerActive = 'false';
    el.style.setProperty('--spot-opacity', '0');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  const surfaceClass = variant === 'silver' ? 'silver-surface' : 'glass-surface';

  return (
    <div
      ref={cardRef}
      data-specular={enableInteractive ? 'true' : 'false'}
      onPointerMove={enableInteractive ? handlePointerMove : undefined}
      onPointerLeave={enableInteractive ? handlePointerLeave : undefined}
      className={`${surfaceClass} specular-card rounded-[26px] lg:rounded-[32px] overflow-hidden ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
