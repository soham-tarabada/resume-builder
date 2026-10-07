import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useResume } from '../../context/ResumeContext';
import { resumeFileName } from '../../utils/exporters';
import ResumeDocument from '../preview/ResumeDocument';

/**
 * Renders an unscaled copy of the resume as a direct child of <body>, then opens
 * the print dialog. The print stylesheet hides everything else, so "Save as PDF"
 * yields real, selectable text that applicant tracking systems can parse.
 */
const PrintPortal: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const { resumeData } = useResume();

  useEffect(() => {
    const previousTitle = document.title;
    // Browsers use the page title as the default PDF file name.
    document.title = resumeFileName(resumeData);
    const finish = () => {
      document.title = previousTitle;
      onDone();
    };
    window.addEventListener('afterprint', finish);
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      await document.fonts?.ready;
      if (!cancelled) window.print();
    }, 60);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('afterprint', finish);
      document.title = previousTitle;
    };
    // Print once per mount; later edits can't happen while the dialog is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div id="print-root">
      <ResumeDocument templateId={resumeData.selectedTemplate} theme={resumeData.theme} />
    </div>,
    document.body
  );
};

export default PrintPortal;
