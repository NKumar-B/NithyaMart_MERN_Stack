import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast" style={{ borderColor: t.type === 'error' ? '#f43f5e' : '#10b981' }}>
          {t.type === 'error' ? <AlertCircle size={18} color="#f43f5e" /> : <CheckCircle size={18} color="#10b981" />}
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}