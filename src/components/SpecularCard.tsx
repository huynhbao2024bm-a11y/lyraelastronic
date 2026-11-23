'use client';

import { useCallback, useRef } from 'react';
import { useHardwareTier } from '@/hooks/useHardwareTier';

interface SpecularCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'silver';
}

/**
 * Thẻ vật liệu Kính Quang Học (.glass-surface) hoặc Nhôm Bạc (.silver-surface):
 * - Nâng nhẹ translateY(-4px) khi hover
 * - Vệt ánh sáng trắng bạc thuần khiết rgba(255,255,255,0.65) theo trỏ chuột trên desktop.
 */
export function SpecularCard({
  children,
  className = '',
  variant = 'glass',
}: SpecularCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { tier, finePointer } = useHardwareTier();
  const enableSpecular = tier === 'high' && finePointer;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enableSpecular || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--spot-x', `${x}px`);
      cardRef.current.style.setProperty('--spot-y', `${y}px`);
      cardRef.current.style.setProperty('--spot-opacity', '1');
    },
    [enableSpecular],
  );

  const handlePointerLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--spot-opacity', '0');
  }, []);

  const surfaceClass = variant === 'silver' ? 'silver-surface' : 'glass-surface';

  return (
    <div
      ref={cardRef}
      data-specular={enableSpecular ? 'true' : 'false'}
      onPointerMove={enableSpecular ? handlePointerMove : undefined}
      onPointerLeave={enableSpecular ? handlePointerLeave : undefined}
      className={`${surfaceClass} specular-card rounded-[24px] lg:rounded-[30px] overflow-hidden ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
