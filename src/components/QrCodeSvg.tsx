import QRCode from 'qrcode';
import { useMemo } from 'react';

interface QrCodeSvgProps {
  value: string;
  size?: number;
  darkColor?: string;
  lightColor?: string;
  className?: string;
  label?: string;
}

/**
 * Render mã QR SVG chuẩn quét được tại build/render time, không phụ thuộc ảnh ngoài.
 */
export function QrCodeSvg({
  value,
  size = 160,
  darkColor = '#1D1D1F',
  lightColor = '#FFFFFF',
  className = '',
  label = 'Mã QR liên hệ Zalo',
}: QrCodeSvgProps) {
  const { viewBoxSize, pathData } = useMemo(() => {
    const qr = QRCode.create(value, { errorCorrectionLevel: 'M' });
    const count = qr.modules.size;
    const data = qr.modules.data;
    const quietZone = 2;
    const total = count + quietZone * 2;
    let d = '';

    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (data[row * count + col]) {
          const x = col + quietZone;
          const y = row + quietZone;
          d += `M${x},${y}h1v1h-1z`;
        }
      }
    }

    return { viewBoxSize: total, pathData: d };
  }, [value]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      role="img"
      aria-label={label}
      className={className}
      shapeRendering="crispEdges"
    >
      <rect width={viewBoxSize} height={viewBoxSize} fill={lightColor} />
      <path d={pathData} fill={darkColor} />
    </svg>
  );
}
