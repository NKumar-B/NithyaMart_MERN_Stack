import React from 'react';
import { X, CheckCircle2, Truck, Printer, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OrderReceiptModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '650px', background: '#0f172a' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <CheckCircle2 size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#f8fafc' }}>Order Successfully Placed!</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Thank you for shopping at VibeSportX. Your order confirmation receipt has been generated.
          </p>
        </div>

        {/* Invoice Receipt Container */}
        <div style={{ background: '#131b2e', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>RECEIPT / ORDER NO</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#06b6d4' }}>{order.orderId}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>TRACKING CODE</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#f8fafc' }}>{order.trackingNumber}</div>
            </div>
          </div>

          {/* Delivery Timeline Card */}
          <div style={{ background: 'rgba(37, 99, 235, 0.12)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px', padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <Truck size={24} color="#2563eb" />
            <div>
              <span style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 'bold', display: 'block' }}>Estimated Delivery:</span>
              <span style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: '800' }}>{order.estimatedDelivery}</span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 'bold' }}>Purchased Sports Wear:</span>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div>
                  <span style={{ color: '#f8fafc', fontWeight: '600' }}>{item.name}</span> (x{item.quantity})
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Size: {item.selectedSize || 'M'} • {item.brand}</div>
                </div>
                <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>${order.summary.subtotal.toFixed(2)}</span>
            </div>
            {order.summary.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>Discount Applied:</span>
                <span>-${order.summary.discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping Fee:</span>
              <span>{order.summary.shipping === 0 ? <span style={{ color: '#10b981' }}>FREE</span> : `$${order.summary.shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tax (8%):</span>
              <span>${order.summary.tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', paddingTop: '0.5rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
              <span>Total Paid:</span>
              <span style={{ color: '#10b981' }}>${order.summary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="nav-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={handlePrint}>
            <Printer size={16} /> Print Receipt
          </button>
          <button className="btn-block" style={{ flex: 1 }} onClick={onClose}>
            Back to Shopping Store
          </button>
        </div>
      </div>
    </div>
  );
}