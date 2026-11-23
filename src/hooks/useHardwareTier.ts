'use client';

import { useEffect, useState } from 'react';

export type HardwareTier = 'high' | 'balanced' | 'reduced';

interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
}

/**
 * Tự động đánh giá năng lực phần cứng & tùy chọn người dùng để kích hoạt
 * hiệu ứng ánh sáng specular / 3D scroll mượt mà trên máy khỏe và giữ
 * tốc độ 60fps nhẹ nhàng trên thiết bị cấu hình thấp.
 */
export function useHardwareTier(): { tier: HardwareTier; finePointer: boolean } {
  const [state, setState] = useState<{ tier: HardwareTier; finePointer: boolean }>({
    tier: 'balanced',
    finePointer: false,
  });

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(pointer: fine)');

    const evaluate = () => {
      if (reducedQuery.matches) {
        setState({ tier: 'reduced', finePointer: finePointerQuery.matches });
        return;
      }

      const nav = navigator as NavigatorExtended;
      const cores = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : 4;
      const memory = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : 8;
      const saveData = Boolean(nav.connection?.saveData);

      if (saveData || cores <= 2 || memory <= 2) {
        setState({ tier: 'balanced', finePointer: finePointerQuery.matches });
        return;
      }

      if (cores >= 4 && memory >= 4) {
        setState({ tier: 'high', finePointer: finePointerQuery.matches });
        return;
      }

      setState({ tier: 'balanced', finePointer: finePointerQuery.matches });
    };

    evaluate();
    reducedQuery.addEventListener('change', evaluate);
    finePointerQuery.addEventListener('change', evaluate);

    return () => {
      reducedQuery.removeEventListener('change', evaluate);
      finePointerQuery.removeEventListener('change', evaluate);
    };
  }, []);

  return state;
}
