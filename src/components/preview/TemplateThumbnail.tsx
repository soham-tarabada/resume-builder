import React, { memo, useEffect, useRef, useState } from 'react';
import { ResumeDataProvider } from '../../context/ResumeContext';
import type { PaletteName } from '../../data/palettes';
import { sampleResume } from '../../data/sampleResume';
import ResumeDocument from './ResumeDocument';
import ScaledPage from './ScaledPage';

interface TemplateThumbnailProps {
  templateId: string;
  accent?: PaletteName | null;
  /** Render immediately instead of waiting to scroll into view. */
  eager?: boolean;
}

/** A live, scaled-down render of a template filled with the sample resume. */
const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({ templateId, accent = null, eager = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (visible || !ref.current) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className="relative aspect-[210/297] w-full overflow-hidden bg-white" aria-hidden="true">
      {visible ? (
        <ScaledPage clipToPage>
          <ResumeDataProvider data={sampleResume}>
            <ResumeDocument templateId={templateId} theme={{ accent, font: 'default' }} />
          </ResumeDataProvider>
        </ScaledPage>
      ) : (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-slate-100 to-slate-50" />
      )}
    </div>
  );
};

export default memo(TemplateThumbnail);
