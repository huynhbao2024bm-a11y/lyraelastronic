'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  QrCode,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Wallet,
  X,
} from 'lucide-react';
import { DemoKey, SITE_CONFIG, formatVnd } from '@/config/site';
import { QrCodeSvg } from './QrCodeSvg';

interface DemoModalProps {
  demoKey: DemoKey | null;
  onClose: () => void;
  onOpenZalo: () => void;
}

interface CustomLineItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

/**
 * Sandbox 1: Web App POS & Kiểm soát dòng tiền số nguyên VND (Split-pane chuyên nghiệp)
 */
function PosSandbox() {
  const [name, setName] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [qtyInput, setQtyInput] = useState('1');
  const [items, setItems] = useState<CustomLineItem[]>([]);
  const [discountPct, setDiscountPct] = useState<0 | 5 | 10>(0);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'cash'>('qr');
  const [receiptInfo, setReceiptInfo] = useState<{ time: string; ref: string } | null>(null);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items],
  );
  const discountAmount = Math.round((subtotal * discountPct) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const addItem = (itemName: string, unitPrice: number, qty: number) => {
    const clean = itemName.trim();
    if (!clean || unitPrice <= 0 || qty <= 0) return;
    setReceiptInfo(null);
    setItems((prev) => [
      ...prev,
      { id: `${Date.now()}-${prev.length}`, name: clean, price: unitPrice, qty },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = Math.max(0, Math.round(Number(priceInput.replace(/[^\d]/g, '')) || 0));
    const parsedQty = Math.max(1, Math.round(Number(qtyInput) || 1));
    if (!name.trim() || parsedPrice <= 0) return;
    addItem(name, parsedPrice, parsedQty);
    setName('');
    setPriceInput('');
    setQtyInput('1');
  };

  const updateQty = (id: string, delta: number) => {
    setReceiptInfo(null);
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeLine = (id: string) => {
    setReceiptInfo(null);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Left 7 cols: Nhập liệu & Danh sách dòng hàng */}
      <div className="space-y-4 lg:col-span-7">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 sm:grid-cols-12">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên sản phẩm / dịch vụ"
            aria-label="Tên sản phẩm thử nghiệm"
            className="h-10 rounded-xl border border-black/[0.10] bg-white px-3.5 text-[13px] text-[#1D1D1F] placeholder:text-[#6E6E73] focus:border-[#0071E3] focus:outline-none sm:col-span-5"
          />
          <input
            type="text"
            inputMode="numeric"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            placeholder="Đơn giá (VND)"
            aria-label="Đơn giá VND"
            className="h-10 rounded-xl border border-black/[0.10] bg-white px-3.5 text-[13px] text-[#1D1D1F] placeholder:text-[#6E6E73] focus:border-[#0071E3] focus:outline-none sm:col-span-4"
          />
          <div className="flex gap-2 sm:col-span-3">
            <input
              type="number"
              min={1}
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
              aria-label="Số lượng"
              className="h-10 w-14 rounded-xl border border-black/[0.10] bg-white px-2 text-center text-[13px] text-[#1D1D1F] focus:border-[#0071E3] focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-1 rounded-xl bg-[#1D1D1F] px-3 text-[13px] font-medium text-white transition-colors hover:bg-[#333336]"
            >
              <Plus className="h-4 w-4" />
              <span>Thêm</span>
            </button>
          </div>
        </form>

        {/* Quick test fillers clearly marked as sandbox test triggers */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="font-medium text-[#6E6E73]">Thêm nhanh để thử:</span>
          <button
            type="button"
            onClick={() => addItem('Mục kiểm thử A', 500000, 1)}
            className="cursor-pointer rounded-full border border-black/[0.08] bg-white px-3 py-1 font-medium text-[#1D1D1F] transition-colors hover:border-[#0071E3]/50"
          >
            + Mục kiểm thử A ({formatVnd(500000)})
          </button>
          <button
            type="button"
            onClick={() => addItem('Mục kiểm thử B', 1200000, 1)}
            className="cursor-pointer rounded-full border border-black/[0.08] bg-white px-3 py-1 font-medium text-[#1D1D1F] transition-colors hover:border-[#0071E3]/50"
          >
            + Mục kiểm thử B ({formatVnd(1200000)})
          </button>
        </div>

        {/* Cart items */}
        <div className="silver-surface apple-scroll max-h-[210px] min-h-[148px] space-y-2 overflow-y-auto rounded-2xl p-3.5">
          {items.length === 0 ? (
            <div className="flex h-[116px] flex-col items-center justify-center text-center">
              <p className="text-[13px] font-medium text-[#1D1D1F]">Chưa có mặt hàng nào trong phiếu</p>
              <p className="mt-1 text-[12px] text-[#6E6E73]">
                Nhập sản phẩm của bạn hoặc bấm nút thêm nhanh phía trên.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/[0.06] bg-white px-3.5 py-2.5 text-[13px] shadow-[0_2px_6px_rgba(15,23,42,0.03)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#1D1D1F]">{item.name}</p>
                  <p className="text-[11px] text-[#6E6E73]">{formatVnd(item.price)} / đơn vị</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Giảm số lượng ${item.name}`}
                    onClick={() => updateQty(item.id, -1)}
                    className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black/[0.08] bg-[#F5F5F7] text-[#1D1D1F]"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-5 text-center text-[12px] font-semibold tabular-nums">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Tăng số lượng ${item.name}`}
                    onClick={() => updateQty(item.id, 1)}
                    className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black/[0.08] bg-[#F5F5F7] text-[#1D1D1F]"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <span className="ml-2 min-w-[84px] text-right font-semibold tabular-nums text-[#1D1D1F]">
                    {formatVnd(item.price * item.qty)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLine(item.id)}
                    aria-label={`Xóa ${item.name}`}
                    className="cursor-pointer pl-1 text-[#6E6E73] hover:text-[#1D1D1F]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right 5 cols: Phiếu thanh toán & Atomic Receipt */}
      <div className="silver-surface flex flex-col justify-between rounded-2xl p-4 lg:col-span-5">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
            <span className="text-[12px] font-semibold text-[#1D1D1F]">Phiếu tính tiền VND</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0071E3]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Atomic Lock
            </span>
          </div>

          {/* Discount & Payment toggles */}
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#6E6E73]">Chiết khấu thử:</span>
            <div className="flex gap-1">
              {([0, 5, 10] as const).map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => {
                    setDiscountPct(pct);
                    setReceiptInfo(null);
                  }}
                  className={`cursor-pointer rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    discountPct === pct
                      ? 'bg-[#1D1D1F] text-white'
                      : 'border border-black/[0.08] bg-white text-[#6E6E73]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => setPaymentMethod('qr')}
              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border py-2 font-medium ${
                paymentMethod === 'qr'
                  ? 'border-[#0071E3] bg-[#0071E3]/10 text-[#0071E3]'
                  : 'border-black/[0.06] bg-white text-[#6E6E73]'
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Chuyển khoản QR</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('cash')}
              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border py-2 font-medium ${
                paymentMethod === 'cash'
                  ? 'border-[#0071E3] bg-[#0071E3]/10 text-[#0071E3]'
                  : 'border-black/[0.06] bg-white text-[#6E6E73]'
              }`}
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>Tiền mặt</span>
            </button>
          </div>

          <div className="space-y-1.5 border-t border-black/[0.06] pt-3 text-[12px]">
            <div className="flex justify-between text-[#6E6E73]">
              <span>Tạm tính</span>
              <span className="tabular-nums text-[#1D1D1F]">{formatVnd(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6E6E73]">
              <span>Chiết khấu ({discountPct}%)</span>
              <span className="tabular-nums text-[#1D1D1F]">-{formatVnd(discountAmount)}</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="font-semibold text-[#1D1D1F]">Tổng cộng</span>
              <span className="text-[20px] font-semibold tabular-nums text-[#1D1D1F]">
                {formatVnd(finalTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          <button
            type="button"
            disabled={finalTotal <= 0}
            onClick={() =>
              setReceiptInfo({
                time: new Date().toLocaleTimeString('vi-VN'),
                ref: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
              })
            }
            className="pill-sheen btn-shadow-blue inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0071E3] px-4 text-[13px] font-medium text-white hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Kiểm thử chốt đơn</span>
          </button>

          {receiptInfo && (
            <div className="flex items-center gap-2.5 rounded-xl border border-[#0071E3]/25 bg-[#0071E3]/8 p-2.5 text-[12px] text-[#1D1D1F]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0071E3]" />
              <span>
                Đã ghi nhận đơn thử nghiệm lúc {receiptInfo.time} ({formatVnd(finalTotal)} ·{' '}
                {paymentMethod === 'qr' ? 'QR' : 'Tiền mặt'}).
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Sandbox 2: Zalo Mini App Live Mobile Frame (Split-pane Configurator + iPhone Preview)
 */
function MiniAppSandbox() {
  const [shopName, setShopName] = useState('');
  const [flowMode, setFlowMode] = useState<'booking' | 'loyalty'>('booking');
  const [selectedSlot, setSelectedSlot] = useState('14:30');
  const [confirmed, setConfirmed] = useState(false);

  const displayBrand = shopName.trim() || 'Thương hiệu của bạn';

  return (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
      {/* Left 6 cols: Controls */}
      <div className="space-y-4 lg:col-span-6">
        <div>
          <label htmlFor="miniapp-shop-input" className="text-[12px] font-semibold text-[#6E6E73]">
            1. Tên thương hiệu hiển thị trên Mini App
          </label>
          <input
            id="miniapp-shop-input"
            type="text"
            value={shopName}
            onChange={(e) => {
              setShopName(e.target.value);
              setConfirmed(false);
            }}
            placeholder="Nhập tên cửa hàng của bạn..."
            className="mt-1.5 h-10 w-full rounded-xl border border-black/[0.10] bg-white px-3.5 text-[13px] text-[#1D1D1F] placeholder:text-[#6E6E73] focus:border-[#0071E3] focus:outline-none"
          />
        </div>

        <div>
          <p className="text-[12px] font-semibold text-[#6E6E73]">2. Chọn chế độ giao diện</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setFlowMode('booking');
                setConfirmed(false);
              }}
              className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                flowMode === 'booking'
                  ? 'border-[#0071E3] bg-[#0071E3]/8 shadow-[0_4px_12px_-4px_rgba(0,113,227,0.18)]'
                  : 'border-black/[0.08] bg-white hover:border-black/20'
              }`}
            >
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Đặt lịch hẹn</p>
              <p className="mt-0.5 text-[11px] text-[#6E6E73]">Chọn khung giờ &amp; cấp QR</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setFlowMode('loyalty');
                setConfirmed(false);
              }}
              className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                flowMode === 'loyalty'
                  ? 'border-[#0071E3] bg-[#0071E3]/8 shadow-[0_4px_12px_-4px_rgba(0,113,227,0.18)]'
                  : 'border-black/[0.08] bg-white hover:border-black/20'
              }`}
            >
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Thẻ thành viên</p>
              <p className="mt-0.5 text-[11px] text-[#6E6E73]">Tích điểm &amp; quét mã</p>
            </button>
          </div>
        </div>

        {flowMode === 'booking' && (
          <div>
            <p className="text-[12px] font-semibold text-[#6E6E73]">3. Chọn khung giờ thử nghiệm</p>
            <div className="mt-2 flex gap-2">
              {['09:30', '14:30', '16:00'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setSelectedSlot(slot);
                    setConfirmed(false);
                  }}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-[12px] font-medium transition-colors ${
                    selectedSlot === slot
                      ? 'border-[#0071E3] bg-[#0071E3] text-white'
                      : 'border-black/[0.08] bg-white text-[#1D1D1F]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="pill-sheen btn-shadow-blue inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-full bg-[#0071E3] text-[13px] font-medium text-white hover:bg-[#0077ED]"
        >
          {flowMode === 'booking' ? 'Xác nhận lịch hẹn trên Mini App' : 'Kích hoạt thẻ thành viên QR'}
        </button>
      </div>

      {/* Right 6 cols: Live Miniature Silver Phone Frame */}
      <div className="flex justify-center lg:col-span-6">
        <div className="silver-surface device-elevation w-full max-w-[290px] rounded-[32px] p-2.5">
          <div className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-[#FFFFFF]">
            {/* Zalo Mini App Top Bar */}
            <div className="flex items-center justify-between border-b border-black/[0.06] bg-[#F5F5F7] px-4 py-2.5">
              <span className="truncate text-[12px] font-semibold text-[#1D1D1F]">
                {displayBrand}
              </span>
              <span className="rounded-full border border-black/[0.08] bg-white px-2.5 py-0.5 text-[10px] font-medium text-[#6E6E73]">
                Zalo Mini App
              </span>
            </div>

            <div className="space-y-3 p-4">
              <div className="rounded-2xl border border-black/[0.06] bg-[#F5F5F7] p-3.5">
                <p className="text-[11px] font-semibold text-[#0071E3]">
                  {flowMode === 'booking' ? 'Phiếu đặt lịch' : 'Thẻ khách hàng'}
                </p>
                <p className="mt-0.5 text-[14px] font-semibold text-[#1D1D1F]">
                  {flowMode === 'booking'
                    ? `Khung giờ đã chọn: ${selectedSlot}`
                    : 'Sẵn sàng tích điểm qua SĐT'}
                </p>
              </div>

              <div className="flex flex-col items-center rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-[0_4px_12px_-4px_rgba(15,23,42,0.06)]">
                <QrCodeSvg
                  value={SITE_CONFIG.zaloHref}
                  size={104}
                  label={`Mã QR Zalo ${SITE_CONFIG.phoneDisplay}`}
                />
                <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-[#6E6E73]">
                  <QrCode className="h-3 w-3 text-[#0071E3]" />
                  <span>{confirmed ? 'Đã xác thực sẵn sàng check-in' : 'Quét tại quầy bằng Zalo'}</span>
                </p>
              </div>

              {confirmed && (
                <div className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0071E3]/10 py-2 text-[11px] font-semibold text-[#0071E3]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Đã gửi xác nhận qua Zalo OA</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChatItem {
  from: 'user' | 'bot';
  text: string;
}

interface TraceState {
  intent: string;
  toolCall: string;
  crmAction: string;
}

/**
 * Sandbox 3: AI Chatbot + Live Tool-Calling & CRM Payload Inspector
 */
function ChatbotSandbox() {
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      from: 'bot',
      text: 'Chào bạn, đây là khung kiểm thử luồng xử lý AI. Hãy chọn một câu hỏi mẫu hoặc nhập tự do để quan sát quy trình phân tích ở cột bên phải.',
    },
  ]);
  const [trace, setTrace] = useState<TraceState>({
    intent: 'ready',
    toolCall: 'awaiting_user_message()',
    crmAction: 'Chưa phát sinh thao tác ghi CRM',
  });

  const analyzeQuery = (query: string): { reply: string; nextTrace: TraceState } => {
    const q = query.toLowerCase();
    if (q.includes('giá') || q.includes('bao nhiêu')) {
      return {
        reply:
          '[Phân loại: Hỏi giá] AI sẽ gọi API đọc bảng giá thực tế trong database (VND nguyên) trước khi trả lời chính xác cho khách.',
        nextTrace: {
          intent: 'price_inquiry',
          toolCall: 'get_catalog_price({ currency: "VND" })',
          crmAction: 'Đọc bảng giá niêm yết từ hệ thống gốc',
        },
      };
    }
    if (q.includes('còn') || q.includes('size') || q.includes('tồn')) {
      return {
        reply:
          '[Phân loại: Kiểm tra tồn kho] AI tra cứu số lượng tồn khả dụng theo chi nhánh để đảm bảo không chốt vượt tồn kho.',
        nextTrace: {
          intent: 'inventory_check',
          toolCall: 'check_branch_stock({ atomic: true })',
          crmAction: 'Kiểm tra tồn khả dụng theo thời gian thực',
        },
      };
    }
    if (q.includes('chốt') || q.includes('đặt') || q.includes('mua')) {
      return {
        reply:
          '[Phân loại: Tạo đơn nháp] AI thu thập đủ tên, SĐT, địa chỉ và đẩy bản ghi đơn hàng vào hàng đợi duyệt của nhân viên.',
        nextTrace: {
          intent: 'create_draft_order',
          toolCall: 'create_crm_draft_order({ idempotent: true })',
          crmAction: 'Tạo đơn nháp về bảng quản trị & gửi ZNS',
        },
      };
    }
    return {
      reply: `[Phân loại: Tư vấn chung] AI đối chiếu tài liệu sản phẩm đã cấu hình cho câu hỏi "${query}" hoặc chuyển tiếp nhân viên nếu vượt phạm vi.`,
      nextTrace: {
        intent: 'general_consultation',
        toolCall: 'search_knowledge_base({ verifiedOnly: true })',
        crmAction: 'Ghi log hội thoại phục vụ nhân viên tiếp nhận',
      },
    };
  };

  const sendPrompt = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);

    const { reply, nextTrace } = analyzeQuery(trimmed);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
      setTrace(nextTrace);
      setTyping(false);
    }, 420);
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Left 7 cols: Chat Thread */}
      <div className="space-y-3 lg:col-span-7">
        <div className="flex flex-wrap gap-1.5">
          {[
            'Sản phẩm này giá bao nhiêu?',
            'Mẫu này còn hàng không shop?',
            'Mình muốn đặt mua sản phẩm này',
          ].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => sendPrompt(preset)}
              className="cursor-pointer rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-medium text-[#6E6E73] transition-colors hover:border-[#0071E3]/40 hover:text-[#1D1D1F]"
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="apple-scroll silver-surface h-[230px] space-y-2.5 overflow-y-auto rounded-2xl p-4 text-[13px]">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-[1.45] ${
                  m.from === 'bot'
                    ? 'rounded-tl-sm border border-black/[0.06] bg-white text-[#1D1D1F] shadow-[0_2px_6px_rgba(15,23,42,0.03)]'
                    : 'rounded-tr-sm bg-[#0071E3] text-white shadow-[0_4px_12px_-3px_rgba(0,113,227,0.28)]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-sm border border-black/[0.06] bg-white px-3.5 py-2 text-[12px] text-[#6E6E73]">
                AI đang phân tích...
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendPrompt(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập thử câu hỏi của khách hàng..."
            aria-label="Nhập câu hỏi thử nghiệm AI Chatbot"
            className="h-10 flex-1 rounded-full border border-black/[0.10] bg-white px-4 text-[13px] text-[#1D1D1F] placeholder:text-[#6E6E73] focus:border-[#0071E3] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Gửi tin nhắn thử nghiệm"
            className="btn-shadow-blue inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0071E3] text-white transition-colors hover:bg-[#0077ED]"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Right 5 cols: Real-time AI Tool-Calling Inspector */}
      <div className="silver-surface flex flex-col justify-between rounded-2xl p-4 lg:col-span-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-2.5">
            <span className="text-[12px] font-semibold text-[#1D1D1F]">Luồng xử lý kỹ thuật</span>
            <span className="rounded-full bg-[#0071E3]/10 px-2 py-0.5 text-[10px] font-semibold text-[#0071E3]">
              Trực tiếp
            </span>
          </div>

          <div className="space-y-2.5 text-[12px]">
            <div className="rounded-xl border border-black/[0.06] bg-white p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6E73]">
                1. Ý định nhận diện
              </p>
              <p className="mt-1 font-mono text-[12px] font-semibold text-[#0071E3]">
                {trace.intent}
              </p>
            </div>

            <div className="rounded-xl border border-black/[0.06] bg-white p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6E73]">
                2. Hàm truy vấn dữ liệu thật
              </p>
              <p className="mt-1 break-all font-mono text-[11px] text-[#1D1D1F]">
                {trace.toolCall}
              </p>
            </div>

            <div className="rounded-xl border border-black/[0.06] bg-white p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6E73]">
                3. Hành động hệ thống
              </p>
              <p className="mt-1 text-[12px] font-medium text-[#1D1D1F]">{trace.crmAction}</p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-[1.45] text-[#6E6E73]">
          AI không tự bịa giá hoặc tồn kho — mọi con số đều đi qua hàm truy vấn có kiểm soát.
        </p>
      </div>
    </div>
  );
}

const DEMO_META: Record<DemoKey, { title: string; subtitle: string }> = {
  'webapp-pos': {
    title: 'Nguyên mẫu: Web App POS & Tính tiền VND',
    subtitle: 'Trải nghiệm giao diện thu ngân 2 cột với khóa giao dịch số nguyên VND.',
  },
  'zalo-miniapp': {
    title: 'Nguyên mẫu: Zalo Mini App',
    subtitle: 'Tùy chỉnh thương hiệu ở bên trái và xem mô phỏng trực tiếp trên khung điện thoại.',
  },
  'ai-chatbot': {
    title: 'Nguyên mẫu: AI Chatbot Phân loại & Chốt đơn',
    subtitle: 'Theo dõi cách AI nhận diện ý định và gọi hàm truy vấn dữ liệu thật theo thời gian thực.',
  },
};

export function DemoModal({ demoKey, onClose, onOpenZalo }: DemoModalProps) {
  useEffect(() => {
    if (!demoKey) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [demoKey, onClose]);

  if (!demoKey) return null;
  const meta = DEMO_META[demoKey];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#F5F5F7]/70 p-0 backdrop-blur-md sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-surface apple-scroll max-h-[92vh] w-full max-w-[820px] overflow-y-auto rounded-t-[28px] p-6 sm:rounded-[30px] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0071E3]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sandbox tương tác · {SITE_CONFIG.brandName}</span>
            </span>
            <h2
              id="demo-modal-title"
              className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#1D1D1F] sm:text-[24px]"
            >
              {meta.title}
            </h2>
            <p className="mt-1 text-[13px] text-[#6E6E73]">{meta.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bản Demo"
            className="silver-surface inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#6E6E73] hover:text-[#1D1D1F]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6">
          {demoKey === 'webapp-pos' && <PosSandbox />}
          {demoKey === 'zalo-miniapp' && <MiniAppSandbox />}
          {demoKey === 'ai-chatbot' && <ChatbotSandbox />}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.08] pt-4">
          <p className="text-[12px] text-[#6E6E73]">Muốn tùy chỉnh theo quy trình của bạn?</p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenZalo();
            }}
            className="pill-sheen btn-shadow-graphite inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 text-[12px] font-medium text-white hover:bg-[#333336]"
          >
            <span>Nhắn Zalo triển khai</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
