import { useEffect } from 'react';

/**
 * Modal overlay reusable component.
 * Props:
 *   - isOpen: boolean
 *   - onClose: function
 *   - children: React nodes
 *   - maxWidth: tailwind class string (default 'max-w-2xl')
 */
export default function Modal({ isOpen, onClose, children, maxWidth = 'max-w-2xl' }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-twilight-950/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-[2rem] shadow-2xl shadow-twilight-950/30 overflow-hidden animate-[modalIn_0.25s_cubic-bezier(0.34,1.56,0.64,1)_both]`}
        style={{
          animation: 'modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Tutup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
