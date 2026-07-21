import { useState, useRef, useCallback } from 'react';

/**
 * Zoomable Image Lightbox.
 * Props:
 *   - isOpen: boolean
 *   - onClose: function
 *   - src: image URL
 *   - alt: string
 */
export default function ImageLightbox({ isOpen, onClose, src, alt }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleClose = useCallback(() => {
    resetView();
    onClose();
  }, [onClose, resetView]);

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 5));
  const zoomOut = () => {
    const next = Math.max(scale - 0.5, 1);
    setScale(next);
    if (next === 1) setPosition({ x: 0, y: 0 });
  };

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setScale((s) => {
      const next = Math.min(Math.max(s + delta, 1), 5);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // Mouse drag
  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    setDragging(true);
    lastPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - lastPos.current.x,
      y: e.clientY - lastPos.current.y,
    });
  };
  const handleMouseUp = () => setDragging(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-twilight-950/90 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-twilight-950/80 to-transparent z-10">
        <span className="text-white font-semibold text-sm truncate max-w-xs">{alt}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 1}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-all"
            title="Perkecil"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          <button
            onClick={resetView}
            className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={zoomIn}
            disabled={scale >= 5}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 transition-all"
            title="Perbesar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-sunset-500 text-white transition-all ml-2"
            title="Tutup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: dragging ? 'grabbing' : scale > 1 ? 'grab' : 'default' }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: dragging ? 'none' : 'transform 0.2s ease',
            maxWidth: '90vw',
            maxHeight: '85vh',
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Bottom Hint */}
      {scale === 1 && (
        <div className="absolute bottom-5 text-white/40 text-xs pointer-events-none">
          Scroll untuk zoom · Drag untuk geser saat diperbesar
        </div>
      )}
    </div>
  );
}
