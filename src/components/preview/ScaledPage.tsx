import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { A4_HEIGHT_PX, A4_WIDTH_PX } from '../../utils/page';

interface ScaledPageProps {
  children: ReactNode;
  /** Clip to a single A4 page (thumbnails) instead of growing with content. */
  clipToPage?: boolean;
  /** Draw dashed markers where the PDF will break onto a new page. */
  showPageBreaks?: boolean;
  className?: string;
}

/**
 * Lays an A4-width page out at full size, then scales it down to fit its
 * container. Templates always see the same 794px canvas the PDF uses, so the
 * preview is exactly what gets exported.
 */
const ScaledPage: React.FC<ScaledPageProps> = ({ children, clipToPage = false, showPageBreaks = false, className = '' }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(A4_HEIGHT_PX);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    setContainerWidth(outer.clientWidth);
    setContentHeight(inner.scrollHeight);
    const observer = new ResizeObserver(() => {
      setContainerWidth(outer.clientWidth);
      setContentHeight(inner.scrollHeight);
    });
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  const scale = containerWidth ? containerWidth / A4_WIDTH_PX : 0;
  const pageHeight = clipToPage ? A4_HEIGHT_PX : Math.max(contentHeight, A4_HEIGHT_PX);
  const pageCount = Math.max(1, Math.ceil((contentHeight - 4) / A4_HEIGHT_PX));

  return (
    <div ref={outerRef} className={`relative w-full ${className}`}>
      <div
        className="relative overflow-hidden"
        style={{ width: A4_WIDTH_PX * scale, height: pageHeight * scale }}
      >
        <div
          ref={innerRef}
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: A4_WIDTH_PX, transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}
        >
          {children}
        </div>
        {showPageBreaks &&
          Array.from({ length: pageCount - 1 }, (_, i) => (
            <div
              key={i}
              className="pointer-events-none absolute inset-x-0 flex items-center"
              style={{ top: (i + 1) * A4_HEIGHT_PX * scale }}
              aria-hidden="true"
            >
              <div className="h-px flex-1 border-t border-dashed border-rose-400/70" />
              <span className="mx-2 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-500 ring-1 ring-rose-200">
                Page {i + 2}
              </span>
              <div className="h-px flex-1 border-t border-dashed border-rose-400/70" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScaledPage;
